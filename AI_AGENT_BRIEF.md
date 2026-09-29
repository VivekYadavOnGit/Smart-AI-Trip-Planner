# Smart AI Trip Planner — AI Agent Brief

## Project Overview

**Name:** Smart AI Trip Planner

**Description:** A React-based travel planning web application that generates personalized itineraries using AI, enriches trip details using Google Places data, and stores user-generated trips in Firebase Firestore.

**Primary goals:**
- Let users describe travel preferences and destination details.
- Generate structured travel plans using a Gemini AI model.
- Enrich AI-generated places with real place metadata and photos.
- Save generated trips for authenticated users.
- Display saved trips and trip details via a simple React SPA.

## Technology Stack

- React 18 with Vite
- React Router DOM for routing
- Tailwind CSS for styling
- Firebase Firestore for persisted trip storage
- Google OAuth for user sign-in
- Google Gemini AI via `@google/generative-ai`
- Google Places API for place details and photos
- Axios for HTTP requests
- Sonner for toast notifications
- Radix UI primitives for dialogs and UI controls

## Project Structure

```
src/
  App.jsx
  main.jsx
  api/
    place-details.js
  components/
    custom/...
    ui/...
  constants/
    options.jsx
  create-trip/index.jsx
  lib/enrichDataWithPlaces.js
  my-trips/index.jsx
  my-trips/components/UserTripCardItems.jsx
  service/AIModal.jsx
  service/firebaseConfig.jsx
  service/GlobalApi.jsx
  view-trip/[tripId]/index.jsx
  view-trip/[tripId]/components/...
```

## Entry Points

- `src/main.jsx`
  - Creates the React Router routes.
  - Wraps the app in `GoogleOAuthProvider` with `VITE_GOOGLE_AUTH_CLIENT_ID`.
  - Mounts `App`, `CreateTrip`, `ViewTrip`, and `MyTrips` routes.
- `src/App.jsx`
  - Landing page with header, hero, features, popular destinations, FAQ, and footer.

## Key Pages and Components

### `src/create-trip/index.jsx`

This is the central page for trip generation.

Responsibilities:
- Collect user input via a form:
  - destination using Google Places Autocomplete
  - number of days
  - budget tier
  - traveller type
- Build a structured prompt using `AI_PROMPT` from `src/constants/options.jsx`.
- Authenticate user with Google OAuth if needed.
- Call `chatSession.sendMessage(FINAL_PROMPT)` to generate AI trip data.
- Validate that `parsed.itinerary` exists and is an array.
- Enrich generated itinerary items through `src/lib/enrichDataWithPlaces.js`.
- Save results to Firebase Firestore (`AITrips` collection).
- Redirect to `/view-trip/:tripId` after saving.

### `src/service/AIModal.jsx`

This file is the AI client.

Responsibilities:
- Initialize Gemini using `GoogleGenerativeAI` with `VITE_GOOGLE_GEMINI_AI_API_KEY`.
- Define a strict JSON-only prompt.
- Request `gemini-3-flash-preview` to generate structured trip data.
- Strip Markdown fences and parse JSON.

Important behavior:
- The prompt forces the model to return JSON only.
- No schema validation beyond JSON parse and itinerary array check.

### `src/lib/enrichDataWithPlaces.js`

This logic enriches AI output with real place metadata.

Responsibilities:
- Iterate over `tripData.itinerary`.
- For each place, fetch details via `/api/place-details?query=placeName`.
- Merge API results into each place object:
  - `placeDetails`
  - `coordinates`
  - `imageUrl`
- Return enriched trip data.

### `src/api/place-details.js`

A serverless API endpoint wrapper.

Responsibilities:
- Accept GET requests with `query`.
- Use `GOOGLE_PLACES_API_KEY` or `VITE_GOOGLE_PLACE_API_KEY`.
- Call Google Places Text Search API.
- Return address, rating, coordinates, and a place photo URL.

### `src/service/GlobalApi.jsx`

A client for the newer Google Places API endpoints.

Responsibilities:
- POST to `https://places.googleapis.com/v1/places:searchText`.
- Export `PHOTO_URL_REF` for media requests.
- Used by trip view components to fetch place and location photos.

### `src/view-trip/[tripId]/index.jsx`

Trip detail page.

Responsibilities:
- Load a trip by `tripId` from Firestore.
- Render:
  - `InfoSection`
  - `Hotels`
  - `PlaceToVisit`
- Display itinerary, hotel suggestions, and trip metadata.

### `src/my-trips/index.jsx`

User trip listing page.

Responsibilities:
- Read authenticated user from `localStorage`.
- Query Firestore `AITrips` for trips matching `userEmail`.
- Show saved trips with preview images.

### View-trip child components

- `InfoSection.jsx`
  - Fetches a photo for the destination label.
  - Displays trip metadata and a share button.
- `Hotels.jsx`
  - Renders hotel recommendation cards from `trip.tripData.hotels`.
- `PlaceToVisit.jsx`
  - Loops through itinerary days and renders each `PlaceCardItem`.
- `PlaceCardItem.jsx`
  - Fetches a photo for each place.
  - Links to Google Maps search.

### `src/my-trips/components/UserTripCardItems.jsx`

Shows saved trip cards with preview image and link to view details.

## Data Model

Saved trip document shape in Firestore:

- `id`: timestamp string generated with `Date.now().toString()`
- `userSelection`: {
  - `location`: Google Places object with `label` and metadata
  - `noOfDays`: string
  - `budget`: string
  - `traveller`: string
}
- `tripData`: {
  - `destination` string
  - `itinerary` array of day objects
  - `hotels` array
  - `estimated_cost` string
  - `best_time_to_visit` string
}
- `userEmail`: authenticated user email

## Environment / Config

### Aliases
- `@/*` maps to `src/*` via `jsconfig.json` and `vite.config.js`

### Environment variables in `.env`
- `VITE_GOOGLE_PLACE_API_KEY`
- `VITE_GOOGLE_GEMINI_AI_API_KEY`
- `VITE_GOOGLE_AUTH_CLIENT_ID`
- `VITE_UNSPLASH_API_KEY` (present but not currently used)
- `VITE_BACKEND_API` (present but not currently used)

### Other config notes
- `package.json` contains `dev:api` pointing to `src/api/server.js`, but that file is not present.
- Firebase config is hardcoded in `src/service/firebaseConfig.jsx`.

## Important Observations

- AI output is expected as strict JSON, but there is no robust fallback when parsing fails.
- The app depends strongly on Google Gemini and Google Places API keys.
- The `create-trip` page both authenticates and triggers trip generation.
- Trip persistence is managed with Firestore.
- The route `/api/place-details` is used by the browser to fetch place metadata.
- There is no explicit backend server in the repository beyond the one API handler.

## Tasks Suitable for Other Agents

### High-priority improvements
1. Add robust AI response validation and fallback handling.
2. Add error boundaries for Firestore reads and place API fetches.
3. Fix or remove the dangling `dev:api` script.
4. Secure environment variables and remove hard-coded Firebase config from source if possible.
5. Add logging or analytics for generation and save failures.

### UI / user experience
1. Add a loading state or spinner for trip detail page fetches.
2. Improve mobile responsiveness for itinerary cards.
3. Allow editing or re-generating saved trips.
4. Add a proper sign-in/out flow instead of storing raw profile data in `localStorage`.

### Feature additions
1. Add a task for AI prompt refinement to improve itinerary quality.
2. Add hotel detail enrichment with pricing and booking links.
3. Support more destination search fallback modes when Google Places returns no results.
4. Add a PDF export or shareable itinerary summary.

### Testing and documentation
1. Add unit tests for `enrichDataWithPlaces.js` and `AIModal.jsx`.
2. Add integration tests for the trip creation flow.
3. Document `npm run dev`, environment vars, and deployment steps.

## How AI Agents Should Use This Brief

1. Read the high-level architecture first.
2. Identify the relevant route or component for the task.
3. Check whether the task affects AI generation, API integration, Firestore persistence, or UI rendering.
4. Use the environment section to know which keys and config values are required.
5. Prefer changes in these files for feature or bug work:
   - `src/create-trip/index.jsx`
   - `src/service/AIModal.jsx`
   - `src/lib/enrichDataWithPlaces.js`
   - `src/api/place-details.js`
   - `src/view-trip/[tripId]/index.jsx`
   - `src/my-trips/index.jsx`

## Summary

This project is a React single-page app that coordinates:
- user input for travel planning,
- AI generation through Gemini,
- Google Places enrichment,
- Firebase storage,
- and trip visualization.

It is built to be extended with better validation, stronger API error handling, and smoother user authentication.
