import React from 'react';
import { useLocation } from 'react-router-dom';
import Bookform from './Bookform';

export const Booking = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const userId = queryParams.get('userId');
    const hostelId = queryParams.get('hostelId');
    const hostelname = queryParams.get('hostelname');

    return (
        <div className='flex flex-col items-center m-8 p-4'>
           
                <h2 className='text-2xl font-bold'>{hostelname}</h2>
            <div className=' w-1/2'>
                <Bookform userId={userId!} hostelId={hostelId!} />
            </div>
        </div>
    );
};

export default Booking;
