import axios from "axios";

const GOOGLE_PLACES_API_KEY = import.meta.env.VITE_GOOGLE_PLACE_API_KEY;
const UNSPLASH_ACCESS_KEY = import.meta.env.VITE_UNSPLASH_API_KEY;

// Helper to get Google Place data
async function getPlaceDetails(query) {
  const encodedQuery = encodeURIComponent(query);
  const url = `http://localhost:5000/api/place-details?query=${encodedQuery}`;

  const res = await fetch(url);
  const data = await res.json();
  const place = data.results?.[0];

  if (!place) return null;

  const photoUrl = place.photos?.[0]
    ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${place.photos[0].photo_reference}&key=${GOOGLE_PLACES_API_KEY}`
    : null;

  return {
    address: place.formatted_address,
    rating: place.rating,
    coordinates: place.geometry?.location,
    image: photoUrl,
  };
}

// Fallback image from Unsplash
async function getUnsplashImage(query) {
  const res = await fetch(`https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&client_id=${UNSPLASH_ACCESS_KEY}`);
  const data = await res.json();
  return data.results?.[0]?.urls?.regular || '';
}

// Enrich hotel or place data
async function enrichPlace(entry, queryKey = "name") {
  const query = entry[queryKey];
  const gData = await getPlaceDetails(query);

  return {
    ...entry,
    address: gData?.address || entry.address || '',
    geo: gData?.coordinates || entry.geo || {},
    imageUrl: gData?.image || (await getUnsplashImage(query)),
    rating: gData?.rating || entry.rating || '',
  };
}

export async function enrichTravelData(data) {
  const hotels = Array.isArray(data.hotels) ? data.hotels : [];
  const itinerary = Array.isArray(data.itinerary) ? data.itinerary : [];

  const enrichedHotels = await Promise.all(
    hotels.map((hotel) => enrichPlace(hotel, "HotelName"))
  );

  const enrichedItinerary = await Promise.all(
    itinerary.map(async (day) => {
      const places = Array.isArray(day.places) ? day.places : [];
      const enrichedPlaces = await Promise.all(
        places.map((place) => enrichPlace(place, "placeName"))
      );
      return { ...day, places: enrichedPlaces };
    })
  );

  return { ...data, hotels: enrichedHotels, itinerary: enrichedItinerary };
}

