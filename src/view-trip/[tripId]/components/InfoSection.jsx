import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Share2 } from 'lucide-react';
import { getPlaceDetails } from '@/service/GlobalApi';
import { PHOTO_URL_REF } from '@/service/GlobalApi';


export const InfoSection = ({ trip }) => {
  const [photoUrl, setPhotoUrl] = useState('/placeholder.png');

  useEffect(() => {
    if (trip) {
      fetchPlacePhoto();
    }
  }, [trip]);

  const fetchPlacePhoto = async () => {
    const data = {
      textQuery: trip?.userSelection?.location?.label
    };

    try {
      const response = await getPlaceDetails(data);
      const photos = response.data.places?.[0]?.photos;
      if (photos && photos.length > 0) {
        const photoName = photos[0].name;
        const url = PHOTO_URL_REF.replace('{NAME}', photoName);
        setPhotoUrl(url);
        console.log('Photo URL:', url);
      } else {
        setPhotoUrl('/placeholder.png');
      }
    } catch (error) {
      console.error('Error fetching place details:', error);
      setPhotoUrl('/placeholder.png');
    }
  };

  return (
    <div>
      <img src={photoUrl} className='h-[340px] w-full object-cover rounded-xl' alt="Location" />
      <div className='flex justify-between items-center'>
        <div className='flex flex-col gap-2 my-5'>
          <h2 className='font-bold text-2xl'>{trip.userSelection?.location?.label}</h2>
          <div className='flex gap-5'>
            <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500'>📆 {trip.userSelection?.noOfDays} Day</h2>
            <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500'>💰 {trip.userSelection?.budget} Budget</h2>
            <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500'>#️⃣ No. of Traveller: {trip.userSelection?.traveller}</h2>
          </div>
        </div>
        <Button><Share2 /></Button>
      </div>
    </div>
  );
};
