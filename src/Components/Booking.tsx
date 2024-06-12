import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Bookform from './Bookform';
import Review from './Review';
import Navbar from '../HomeComponents/Navbar';

interface ReviewType {
  username: string;
  message: string;
}

export const Booking: React.FC = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const userId = queryParams.get('userId');
  const hostelId = queryParams.get('hostelId');
  const hostelname = queryParams.get('hostelname');

  const [reviews, setReviews] = useState<ReviewType[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (hostelId) {
      fetch(`http://localhost:8080/user/reviews/${hostelId}`)
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => setReviews(data))
        .catch(error => setError(error.message));
    }
  }, [hostelId]);

  return (
    <>
    
    <div className='flex flex-col items-center m-8 p-4'>
       
      <h2 className='text-2xl font-bold mb-4'>{hostelname || 'Hostel'}</h2>
      <div className='w-full max-w-md mb-8'>
        {userId && hostelId ? (
          <Bookform userId={userId} hostelId={hostelId} />
        ) : (
          <p>Missing user or hostel information.</p>
        )}
      </div>
      <h2 className='text-2xl font-bold mb-4'>Our Reviews</h2>
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full'>
        {error ? (
          <p>No Reviews available</p>
        ) : reviews.length > 0 ? (
          reviews.map((review, index) => (
            <Review key={index} username={review.username} message={review.message} />
          ))
        ) : (
          <p>No reviews available.</p>
        )}
      </div>
    </div>
    </>
  );
};

export default Booking;
