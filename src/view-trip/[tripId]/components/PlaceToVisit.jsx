import React from 'react'
import { PlaceCardItem } from './PlaceCardItem'

export const PlaceToVisit = ({ trip }) => {
  
  return (
    
    <div>
      <h2 className='text-xl font-bold'>Places to Visit</h2>
      <div>
        {trip.tripData?.itinerary?.map((item, index) => (
          <div key={index} className=''>
            <h2 className='font-medium text-lg mt-3'>{item.day}</h2>
            <div className='grid grid-cols-2 gap-5'>
              {item.places?.map((place, index) => (
                <div key={index} className=''>
                  <h2 className='font-medium text-sm text-orange-600'>{place.time}</h2>
                  <PlaceCardItem place={place} />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
