import React, {useState, useEffect} from 'react'
import { Button } from '@/components/ui/button'
import { MapPinned } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getPlaceDetails } from '@/service/GlobalApi';
import { PHOTO_URL_REF } from '@/service/GlobalApi';
export const PlaceCardItem = ({place}) => {

const [photoUrl, setPhotoUrl] = useState('/placeholder.png');

  useEffect(() => {
    if (place) {
      fetchPlacePhoto();
    }
  }, [place]);

  const fetchPlacePhoto = async () => {
    const data = {
      textQuery: place.placeName
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
    <Link to={'https://www.google.com/maps/search/?api=1&query=' + place.placeName + ", " + place?.address} target='_blank' rel='noopener noreferrer'>
    <div className='border rounded-xl p-3 mt-2 flex gap-5 hover:scale-105 transition-all hover:shadow-sm cursor-pointer'>
        <img src={photoUrl}
        className='w-[130px] h-[130px] rounded-xl object-cover' 
        />

        <div>
            <h2 className='font-bold text-lg'>{place.placeName}</h2>
            <p className='text-sm text-gray-500 mt-1'>{place.placeDetails}</p>
            <h2 className='mt-1 text-sm text-black- flex flex-cols-2 gap-1'>Best Time to Visit: <p className='text-green-500 font-bold'>{place.bestTimeToVisit}</p></h2>
            <h2 className='mt-1 text-red-400 font-bold'>🕓 {place.timeRequired}</h2>
            {/* <Button className='mt-2' Siz><MapPinned/></Button> */}
        </div>
    </div>
    </Link>
  )
}
