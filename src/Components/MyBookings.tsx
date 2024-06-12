import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useMyContext } from '../context/MyContext';
import Navbar from '../HomeComponents/Navbar';

interface Booking {
  hostelName: string;
  roomType: string;
  totalPrice: number;
  hostelId: number;
}

const MyBookings = () => {
  const { user } = useMyContext();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [reviewMessage, setReviewMessage] = useState('');

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/user/${user.id}/booking/info`);
        const bookingData: Booking[] = Object.values(response.data);
        console.log('Fetched bookings:', bookingData);
        setBookings(bookingData);
      } catch (error) {
        console.error('Error fetching bookings:', error);
      }
    };

    if (user?.id) {
      fetchBookings();
    }
  }, [user]);

  const handleReviewClick = (booking: Booking) => {
    console.log('Selected booking:', booking);
    setSelectedBooking(booking);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedBooking(null);
    setReviewMessage('');
  };

  const handleReviewSubmit = async () => {
    if (selectedBooking && user?.id) {
      try {
        await axios.post(`http://localhost:8080/user/${user.id}/review/add`, null, {
          params: {
            hostelId: selectedBooking.hostelId,
            message: reviewMessage,
          },
        });
        console.log('Review submitted for:', selectedBooking);
        console.log('Review message:', reviewMessage);
        handleCloseModal();
      } catch (error) {
        console.error('Error submitting review:', error);
      }
    }
  };

  return (<>
  <Navbar></Navbar>
    <div className="flex flex-col p-10 bg-gray-50 min-h-screen">
      <h1 className="font-bold text-4xl mb-4 text-center text-gray-800">My Bookings History</h1>
      <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
          <div className="overflow-hidden shadow-lg rounded-lg">
            <table className="min-w-full text-left text-sm font-light text-gray-800 bg-white">
              <thead className="border-b border-gray-200 font-medium bg-blue-100">
                <tr>
                  <th scope="col" className="px-6 py-4">#</th>
                  <th scope="col" className="px-6 py-4">Hostel Name</th>
                  <th scope="col" className="px-6 py-4">Room Type</th>
                  <th scope="col" className="px-6 py-4">Paid Price</th>
                  <th scope="col" className="px-6 py-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((booking, index) => (
                  <tr
                    key={index}
                    className={`border-b border-gray-200 transition-all duration-300 ease-in-out transform hover:bg-blue-50 hover:scale-105 ${
                      index % 2 === 0 ? 'bg-blue-50' : 'bg-white'
                    }`}
                  >
                    <td className="whitespace-nowrap px-6 py-4 font-medium">{index + 1}</td>
                    <td className="whitespace-nowrap px-6 py-4">{booking.hostelName}</td>
                    <td className="whitespace-nowrap px-6 py-4">{booking.roomType}</td>
                    <td className="whitespace-nowrap px-6 py-4">${booking.totalPrice.toFixed(2)}</td>
                    <td className="whitespace-nowrap px-6 py-4">
                      <button
                        onClick={() => handleReviewClick(booking)}
                        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                      >
                        Review
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6 w-96">
            <h2 className="text-xl font-bold mb-4">Leave a Review for {selectedBooking?.hostelName}</h2>
            <textarea
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="Please leave message here"
              value={reviewMessage}
              onChange={(e) => setReviewMessage(e.target.value)}
            />
            <div className="mt-4 flex justify-end">
              <button
                onClick={handleCloseModal}
                className="px-4 py-2 bg-gray-300 rounded-md mr-2"
              >
                Cancel
              </button>
              <button
                onClick={handleReviewSubmit}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
    </>
  );
};

export default MyBookings;
