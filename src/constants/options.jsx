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
        title: 'Budget',
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
Generate Travel Plan for Location: {location}, for {totalDays} Days for {traveller} with a {budget} budget.
Give me a list of hotel options with the following properties:

- hotelName
- hotel address
- price
- hotel image url
- geo coordinates
- rating
- description

Also suggest a day-wise itinerary including:

- placeName
- placeDetails
- place image url
- geo coordinates
- ticket pricing
- time required at each location
- best time to visit

Respond ONLY in valid JSON format.
`;
