import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getPlaceDetails } from "@/service/GlobalApi";
import { PHOTO_URL_REF } from "@/service/GlobalApi";

export const HotelCardItem = ({ hotel }) => {
  const [photoUrl, setPhotoUrl] = useState("/placeholder.png");

  useEffect(() => {
    if (hotel) {
      fetchPlacePhoto();
    }
  }, [hotel]);

  const fetchPlacePhoto = async () => {
    const data = {
      textQuery: hotel?.hotelName,
    };

    try {
      const response = await getPlaceDetails(data);
      const photos = response.data.places?.[0]?.photos;
      if (photos && photos.length > 0) {
        const photoName = photos[0].name;
        const url = PHOTO_URL_REF.replace("{NAME}", photoName);
        setPhotoUrl(url);
        console.log("Photo URL:", url);
      } else {
        setPhotoUrl("/placeholder.png");
      }
    } catch (error) {
      console.error("Error fetching place details:", error);
      setPhotoUrl("/placeholder.png");
    }
  };

  return (
    <Link
      to={`https://www.google.com/maps/search/?api=1&query=${hotel.hotelName}, ${hotel?.address}`}
      target="_blank"
      rel="noopener noreferrer"
    >
      <div className="flex justify-between items-start mt-5">
        <div className="flex flex-col gap-3">
          <h2 className="text-2xl font-bold">{trip?.userSelection?.location?.label}</h2>
          <div className="flex flex-wrap gap-3">
            <span className="p-1 px-3 bg-gray-200 rounded-full text-gray-500">
              📆 {trip?.userSelection?.noOfDays} Day{trip?.userSelection?.noOfDays > 1 ? 's' : ''}
            </span>
            <span className="p-1 px-3 bg-gray-200 rounded-full text-gray-500">
              💰 {trip?.userSelection?.budget} Budget
            </span>
            <span className="p-1 px-3 bg-gray-200 rounded-full text-gray-500">
              #️⃣ Travellers: {trip?.userSelection?.traveller}
            </span>
          </div>
        </div>
     </div>
    </Link>
  );
};
