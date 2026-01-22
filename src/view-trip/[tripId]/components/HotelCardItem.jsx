import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getPlaceDetails } from "@/service/GlobalApi";
import { PHOTO_URL_REF } from "@/service/GlobalApi";

export const HotelCardItem = ({ hotel }) => {
  const [photoUrl, setPhotoUrl] = useState("/placeholder.png");

  useEffect(() => {
    const name = hotel?.hotelName;
    if (name && name.trim().length > 0) {
      fetchPlacePhoto();
    }
  }, [hotel]);

  const fetchPlacePhoto = async () => {
    const name = hotel?.hotelName;
    if (!name || !name.trim()) return;

    const data = {
      textQuery: name.trim(),
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
      <div className="hover:scale-105 transition-all cursor-pointer">
        <img
          src={photoUrl}
          className="rounded-lg h-[180px] w-full object-cover"
        />
        <div className="my-2 flex flex-col gap-2">
          <h2 className="font-medium">{hotel.hotelName}</h2>
          <h2 className="text-xs text-gray-500">📍 {hotel.address}</h2>
          <h2 className="text-sm">💰 {hotel?.price}</h2>
          <h2 className="text-sm">⭐ {hotel?.rating} stars</h2>
        </div>
      </div>
    </Link>
  );
};
