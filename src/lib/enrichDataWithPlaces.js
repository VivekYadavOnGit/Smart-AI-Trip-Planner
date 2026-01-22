// src/lib/enrichDataWithPlaces.js
export const enrichTravelData = async (tripData) => {
  try {
    const enrichedDays = await Promise.all(
      tripData.itinerary.map(async (day) => {
        const enrichedPlaces = await Promise.all(
          (day.places ?? []).map(async (place) => {
            try {
              const res = await fetch(
                `/api/place-details?query=${encodeURIComponent(place.placeName)}`
              );

              if (!res.ok) {
                console.error(`❌ Failed to fetch details for ${place.placeName}`);
                return place;
              }

              const placeDetails = await res.json();

              return {
                ...place,
                // Fill missing fields from Places API (keep AI fields if already present)
                placeDetails: place.placeDetails ?? placeDetails.address ?? place.placeDetails,
                coordinates: place.coordinates ?? placeDetails.coordinates ?? place.coordinates,
                imageUrl: place.imageUrl ?? placeDetails.image ?? place.imageUrl,
              };
            } catch (err) {
              console.error(`❌ Error enriching ${place.placeName}:`, err.message);
              return place;
            }
          })
        );

        return { ...day, places: enrichedPlaces };
      })
    );

    return { ...tripData, itinerary: enrichedDays };
  } catch (err) {
    console.error("❌ Error enriching trip data:", err.message);
    return tripData;
  }
};
