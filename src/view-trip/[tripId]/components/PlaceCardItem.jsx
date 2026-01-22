import React, {useState, useEffect} from 'react'
import { Button } from '@/components/ui/button'
import { MapPinned } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getPlaceDetails } from '@/service/GlobalApi';
import { PHOTO_URL_REF } from '@/service/GlobalApi';
export const PlaceCardItem = ({place}) => {

const [photoUrl, setPhotoUrl] = useState('/placeholder.png');

  useEffect(() => {
    const name = place?.placeName;
    if (name && name.trim().length > 0) {
      fetchPlacePhoto();
    }
  }, [place]);

  const fetchPlacePhoto = async () => {
    const name = place?.placeName;
    if (!name || !name.trim()) return;

    const data = {
      textQuery: name.trim()
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
    <div className='border rounded-xl p-3 mt-2 flex gap-4 hover:scale-105 transition-all hover:shadow-sm cursor-pointer w-full'>
        <img
          src={photoUrl}
          alt={place.placeName}
          className='w-[130px] h-[130px] rounded-xl object-cover flex-shrink-0' 
        />

        <div className="flex flex-col gap-1 flex-1 overflow-hidden">
            <h2 className='font-bold text-lg break-words'>{place.placeName}</h2>
            <p className='text-sm text-gray-500 mt-1 line-clamp-3'>{place.placeDetails}</p>
            <div className='mt-1 text-sm flex flex-wrap items-center gap-1'>
              <span className='text-gray-700'>Best Time to Visit:</span>
              <span className='text-green-500 font-bold'>{place.bestTimeToVisit}</span>
            </div>
            <div className='mt-1 text-red-400 font-bold text-sm'>
              🕓 {place.timeRequired}
            </div>
            {/* <Button className='mt-2'><MapPinned/></Button> */}
        </div>
    </div>
    </Link>
  )
}
