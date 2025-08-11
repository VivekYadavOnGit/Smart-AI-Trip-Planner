export const SelectTravelesList = [
    { 
        id: 1,
        title: 'just me',
        description: 'A sole traveles in exploration.',
        icon: '🚲',
        people: '1'
    },
    { 
        id: 2,
        title: 'A Couple',
        description: 'Two traveles in tandem.',
        icon: '🛵',
        people: '2 People'
    },
    { 
        id: 3,
        title: 'Family',
        description: 'A group of fun loving adventurers.',
        icon: '🚗',
        people: '3 to 5 People'
    },
    {
        id: 4,
        title: 'Friends',
        description: 'A bunch of trill-seekers.',
        icon: '🚌',
        people: '5 to 10 People'
    }
]

export const SelectBudgetOptions = [
    {
        id: 1,
        title: 'Compact',
        description: 'Stay conscious of costs.',
        icon: '💵',
    },
    {
        id: 2,
        title: 'Mid-Range',
        description: 'Keep cost on the average side.',
        icon: '💰',
    },
    {
        id: 3,
        title: 'Luxury',
        description: 'Don\'t worry about cost.',
        icon: '💳',
    }
]

// AI_PROMPT.js or constants/options.js
export const AI_PROMPT = `
You are a travel planning assistant.

Generate a travel plan in valid JSON format for:
- Location: {location}
- Duration: {totalDays} days
- Traveller type: {traveller}
- Budget: {budget}

Your response must include two main sections:

1. "hotels": an array of **3 to 5** hotel objects. Each hotel must include:
  - "hotelName"
  - "address"
  - "price" (price range $ or ₹ per night)
  - "imageUrl"
  - "coordinates" (latitude, longitude)
  - "rating" (eg., 4.5 stars)
  - "description"

2. "itinerary": an array of day-wise plans. Each object must have:
  - "day": "Day 1", "Day 2", etc.
  - "places": [
      {
        "time": 10:00 AM - 12:00 PM,
        "placeName": "...",
        "placeDetails": "...",
        "imageUrl": "...",
        "coordinates": { "latitude": ..., "longitude": ... },
        "ticketPrice": "...",
        "timeRequired": "...",
        "bestTimeToVisit": "..."
      },
      ...
    ]


📌 Respond ONLY with a **valid JSON object**.
📌 Use **double quotes** around all keys and string values.
📌 Do not include any explanation, markdown, or extra text.
`.trim();


