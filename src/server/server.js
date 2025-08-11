// server.js
import express from 'express';
import axios from 'axios';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());

const GOOGLE_PLACES_API_KEY = process.env.GOOGLE_PLACES_API_KEY;

app.get("/api/place-details", async (req, res) => {
  const query = req.query.query;
  if (!query) return res.status(400).json({ error: "Missing query" });

  try {
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(query)}&key=${GOOGLE_PLACES_API_KEY}`
    );

    const place = response.data.results[0];

    const photoUrl = place?.photos?.[0]
      ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${place.photos[0].photo_reference}&key=${GOOGLE_PLACES_API_KEY}`
      : null;

    return res.json({
      address: place?.formatted_address,
      rating: place?.rating,
      coordinates: place?.geometry?.location,
      image: photoUrl,
    });
  } catch (err) {
    console.error("Error fetching place:", err.message);
    res.status(500).json({ error: "Failed to fetch from Google" });
  }
});

app.listen(5000, () => {
  console.log("✅ Proxy server listening on http://localhost:5000");
});
