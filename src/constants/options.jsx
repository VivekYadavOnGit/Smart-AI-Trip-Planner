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
export const AI_PROMPT = `You are a JSON-only travel planning assistant.
Rules:
- Return ONLY valid JSON
- No explanations or additional text
- No markdown formatting
- No trailing commas
- All strings must be in double quotes
- Arrays and objects must be properly closed
- Maximum 3 activities per day
- Maximum 3 hotel suggestions

Structure:
{
  "destination": "City Name",
  "itinerary": [
    {
      "day": "Day 1",
      "places": [
        {
          "time": "10:00 AM - 12:00 PM",
          "placeName": "Place Name",
          "placeDetails": "Brief description",
          "ticketPrice": "Price or Free",
          "timeRequired": "2 hours",
          "bestTimeToVisit": "Morning/Afternoon/Evening"
        }
      ]
    }
  ],
  "hotels": [
    {
      "hotelName": "Hotel Name",
      "address": "Full address",
      "price": "Price range per night",
      "description": "Brief description"
    }
  ],
  "estimated_cost": "Total budget in local currency",
  "best_time_to_visit": "Best season or months"
}

Generate a travel plan for {location} for {totalDays} days with {traveller} and {budget} budget.`.trim();


