// /api/place-details.js
import axios from "axios";

export default async function handler(req, res) {
  const { query } = req.query;

  if (!query) {
    return res.status(400).json({ error: "Missing query" });
  }

  try {
    const GOOGLE_PLACES_API_KEY = process.env.GOOGLE_PLACES_API_KEY;

    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(
        query
      )}&key=${GOOGLE_PLACES_API_KEY}`
    );

    const place = response.data.results[0];

    const photoUrl = place?.photos?.[0]
      ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${place.photos[0].photo_reference}&key=${GOOGLE_PLACES_API_KEY}`
      : null;

    return res.status(200).json({
      address: place?.formatted_address,
      rating: place?.rating,
      coordinates: place?.geometry?.location,
      image: photoUrl,
    });
  } catch (err) {
    console.error("Error fetching place:", err.message);
    return res.status(500).json({ error: "Failed to fetch from Google" });
  }
}
