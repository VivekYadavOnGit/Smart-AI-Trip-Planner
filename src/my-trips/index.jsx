import {
  collection,
  query,
  where,
  getDocs,
} from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../service/firebaseConfig';
import { UserTripCardItems } from './components/UserTripCardItems';

const MyTrips = () => {
  const navigate = useNavigate();
  const [userTrips, setUserTrips] = useState(null); // null means loading

  useEffect(() => {
    GetUserTrips();
  }, []);

  const GetUserTrips = async () => {
    const userData = localStorage.getItem('user');
    if (!userData) {
      navigate('/');
      return;
    }

    const user = JSON.parse(userData);
    const q = query(
      collection(db, 'AITrips'),
      where('userEmail', '==', user.email)
    );

    try {
      const querySnapshot = await getDocs(q);
      const trips = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setUserTrips(trips);
    } catch (error) {
      console.error('Error fetching trips:', error);
      setUserTrips([]); // fallback
    }
  };

  return (
    <div className="sm:px-10 md:px-32 lg:px-56 xl:px-62 px-5 mt-10">
      <h2 className="text-3xl font-bold mb-4">My Trips</h2>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {userTrips === null ? (
          // Skeleton loading placeholder
          Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="p-2 animate-pulse bg-gray-200 h-56 rounded-lg" />
          ))
        ) : userTrips.length > 0 ? (
          userTrips.map((trip) => (
            <div key={trip.id} className="p-2">
              <UserTripCardItems trip={trip} />
            </div>
          ))
        ) : (
          <p className="text-gray-500">No trips found.</p>
        )}
      </div>
    </div>
  );
};

export default MyTrips;
