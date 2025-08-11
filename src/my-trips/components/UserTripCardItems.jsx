import React, { useEffect, useState } from 'react';
import { getPlaceDetails, PHOTO_URL_REF } from '@/service/GlobalApi';
import { Link } from 'react-router-dom';

export const UserTripCardItems = ({ trip }) => {
  const [photoUrl, setPhotoUrl] = useState('/placeholder.png');

  useEffect(() => {
    if (trip) {
      fetchPlacePhoto();
    }
  }, []);

  const fetchPlacePhoto = async () => {
    const data = {
      textQuery: trip?.userSelection?.location?.label,
    };

    try {
      const response = await getPlaceDetails(data);
      const photos = response.data.places?.[0]?.photos;

      if (photos && photos.length > 0) {
        const photoName = photos[0].name;
        const url = PHOTO_URL_REF.replace('{NAME}', photoName);
        setPhotoUrl(url);
      } else {
        setPhotoUrl('/placeholder.png');
      }
    } catch (error) {
      console.error('Error fetching place details:', error);
      setPhotoUrl('/placeholder.png');
    }
  };

  return (
    <Link to={`/view-trip/${trip.id}`} className="block">
    <div className="rounded-lg shadow-sm p-3 hover:shadow-md transition-all">
      <img
        src={photoUrl}
        alt={`${trip?.userSelection?.location?.label} preview`}
        className="rounded-xl object-cover h-40 w-full mb-3"
      />
      <div>
        <h2 className="font-bold text-lg truncate">
          {trip?.userSelection?.location?.label}
        </h2>
        <p className="text-sm text-gray-600 mt-1">
          {trip?.userSelection?.noOfDays} Days trip • {trip?.userSelection?.budget} package
        </p>
      </div>
    </div>
    </Link>
  );
};
