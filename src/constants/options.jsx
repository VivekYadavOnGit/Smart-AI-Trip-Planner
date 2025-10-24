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

Generate a travel plan in **valid, strict JSON** format for:
- Location: {location}
- Duration: {totalDays} days
- Traveller type: {traveller}
- Budget: {budget}

The JSON structure must be:

{
  "hotels": [
    {
      "hotelName": "",
      "address": "",
      "price": "",
      "imageUrl": "",
      "coordinates": { "latitude": 0, "longitude": 0 },
      "rating": "",
      "description": ""
    }
  ],
  "itinerary": [
    {
      "day": "Day 1",
      "places": [
        {
          "time": "10:00 AM - 12:00 PM",
          "placeName": "",
          "placeDetails": "",
          "imageUrl": "",
          "coordinates": { "latitude": 0, "longitude": 0 },
          "ticketPrice": "",
          "timeRequired": "",
          "bestTimeToVisit": ""
        }
      ]
    }
  ]
}

📌 VERY IMPORTANT:
- Return **only the JSON object**, no markdown or text.
- Use **double quotes** for all keys and string values.
- Ensure the JSON is **syntactically valid and parseable** by JSON.parse().
- Do NOT include comments or trailing commas.
`.trim();

