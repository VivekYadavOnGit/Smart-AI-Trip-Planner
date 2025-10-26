import { HotelCardItem } from './HotelCardItem';

export const Hotels = ({ trip }) => {
    return (
        <div>
            <h2 className='text-xl font-bold my-5'>Hotel Recommendation</h2>

            <div className='grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5'>
                {trip?.tripData?.hotels?.map((hotel, index) => (
                    <HotelCardItem 
                        key={hotel.hotelName || index} 
                        hotel={hotel} 
                    />
                ))}
            </div>
        </div>
    )
}
