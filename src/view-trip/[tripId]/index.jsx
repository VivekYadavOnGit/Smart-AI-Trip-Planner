import { db } from '@/service/firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'sonner';
import { InfoSection } from './components/InfoSection';
import { Hotels } from './components/Hotels';
import { PlaceToVisit } from './components/PlaceToVisit';
import Footer from '@/components/custom/Footer';
import Header from '@/components/custom/Header';

export const ViewTrip = () => {

    const { tripId } = useParams();
    const [tripData, setTripData] = useState([]);

    useEffect(() => {
        tripId && GetTripData();
    }, [tripId]);

    const GetTripData = async () => {
        const docRef = doc(db, "AITrips", tripId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            console.log("Document data:", docSnap.data());
            setTripData(docSnap.data());
        }
        else {
            console.log("No such document!");
            toast.error("No trip Found");
        }
    }



    return (<>
        <div className='p-10 md:px-20 lg:px-44 xl:px-56 mt-10'>
            <Header />
            {/* Information Section */}
            <InfoSection trip={tripData} />

            {/* Hotel Recommended  */}
            <Hotels trip={tripData} />

            {/* Daily Plan */}
            <PlaceToVisit trip={tripData} />
        </div>

         {/* Footer Section */}
        <Footer />
        
        </>
    )
}
