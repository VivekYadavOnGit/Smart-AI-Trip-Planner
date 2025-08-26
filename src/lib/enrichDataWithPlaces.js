// src/lib/enrichDataWithPlaces.js
export const enrichTravelData = async (tripData) => {
  try {
    const enrichedDays = await Promise.all(
      tripData.itinerary.map(async (day) => {
        const enrichedActivities = await Promise.all(
          day.activities.map(async (activity) => {
            try {
              // Call your Vercel serverless API
              const res = await fetch(
                `/api/place-details?query=${encodeURIComponent(activity.name)}`
              );

              if (!res.ok) {
                console.error(`❌ Failed to fetch details for ${activity.name}`);
                return activity; // return original if failed
              }

              const placeDetails = await res.json();

              return {
                ...activity,
                address: placeDetails.address,
                rating: placeDetails.rating,
                coordinates: placeDetails.coordinates,
                image: placeDetails.image,
              };
            } catch (err) {
              console.error(`❌ Error enriching ${activity.name}:`, err.message);
              return activity; // return original if error
            }
          })
        );

        return { ...day, activities: enrichedActivities };
      })
    );

    return { ...tripData, itinerary: enrichedDays };
  } catch (err) {
    console.error("❌ Error enriching trip data:", err.message);
    return tripData; // fallback to original
  }
};
