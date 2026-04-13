# 🌐 Smart AI Trip Planner

**Smart AI Trip Planner** is a React-based travel planning web app that converts user travel preferences into structured itineraries using AI and Google Places data. It stores generated trips in Firebase Firestore and shows destination, hotel, and day-by-day recommendations in a clean single-page interface.

---

## 🚀 What this project does

- Lets users search destinations using Google Places autocomplete.
- Collects travel preferences: days, budget tier, and traveler type.
- Generates a structured travel itinerary through Google Gemini AI.
- Enriches each itinerary place with real details and photos from Google Places.
- Saves trips to Firebase Firestore for later viewing.
- Displays saved trips and full trip details with hotel and activity cards.

---

## 🧩 Core features

- `Home` landing page with hero, destinations, features, FAQ, and footer.
- `Create Trip` workflow that builds the AI prompt and generates trip plans.
- `My Trips` page to list authenticated user trips.
- `View Trip` page for full itinerary details, hotel recommendations, and place cards.
- Google OAuth sign-in for saving trips under the user email.
- AI prompt enforcement for strict JSON output.
- Place enrichment layer to add images and coordinates.

---

## 🏗️ Tech stack

- React 18 + Vite
- React Router DOM
- Tailwind CSS
- Firebase Firestore
- Google OAuth via `@react-oauth/google`
- Gemini AI via `@google/generative-ai`
- Google Places API
- Axios for HTTP requests
- Sonner for toast notifications
- Radix UI for dialog components

---

## 📁 Important files and folders

- `src/main.jsx` - application entry point, router setup, OAuth provider.
- `src/App.jsx` - landing page layout.
- `src/create-trip/index.jsx` - main trip generation page.
- `src/service/AIModal.jsx` - Gemini AI client + prompt builder.
- `src/constants/options.jsx` - budget/traveler options and `AI_PROMPT` template.
- `src/lib/enrichDataWithPlaces.js` - add place details and images to AI itinerary output.
- `src/api/place-details.js` - Google Places wrapper endpoint.
- `src/service/firebaseConfig.jsx` - Firebase Firestore setup.
- `src/my-trips/index.jsx` - user trip list page.
- `src/view-trip/[tripId]/index.jsx` - display full saved trip details.

---

## 🌐 Routing

- `/` → landing page
- `/create-trip` → create and generate a new trip
- `/my-trips` → list saved trips for authenticated user
- `/view-trip/:tripId` → view a saved trip detail page

---

## ⚙️ Environment variables

Create a `.env` file at the project root with these variables:

```env
VITE_GOOGLE_PLACE_API_KEY=your_google_places_api_key
VITE_GOOGLE_GEMINI_AI_API_KEY=your_google_gemini_api_key
VITE_GOOGLE_AUTH_CLIENT_ID=your_google_oauth_client_id
VITE_UNSPLASH_API_KEY=your_unsplash_api_key
VITE_BACKEND_API=http://localhost:5000
```

> Note: The app currently uses `VITE_GOOGLE_PLACE_API_KEY`, `VITE_GOOGLE_GEMINI_AI_API_KEY`, and `VITE_GOOGLE_AUTH_CLIENT_ID` in the core flow.

---

## 🛠️ How to run locally

```bash
npm install
npm run dev
```

Then open the Vite URL shown in the terminal.

---

## 💡 How trip generation works

1. User fills destination, days, budget, and traveler type.
2. `CreateTrip` builds `FINAL_PROMPT` using `AI_PROMPT`.
3. `chatSession.sendMessage()` sends the prompt to Gemini AI.
4. AI returns JSON with `destination`, `itinerary`, `hotels`, and `estimated_cost`.
5. `enrichDataWithPlaces` calls `/api/place-details` to add metadata and images.
6. Result is saved to Firestore and shown on `/view-trip/:tripId`.

---

## 📌 Notes and caveats

- Firebase config is hard-coded in `src/service/firebaseConfig.jsx`.
- The project expects `src/api/place-details.js` to be available as an API route.
- `npm run dev:api` points to `src/api/server.js`, but that file is not present here.
- The AI prompt expects strict JSON output, so invalid AI responses may fail parsing.

---

## ✅ Recommended improvements

- Add better AI response validation and fallback handling.
- Add a sign-out flow and safer auth state handling.
- Expose trip generation errors more clearly to users.
- Replace hard-coded Firebase config with secure environment-based config.
- Add tests for API enrichment and prompt parsing.

---

## 👤 Author

- Vivek Chandrika Yadav
- Email: vivekyadavatwork@gmail.com
