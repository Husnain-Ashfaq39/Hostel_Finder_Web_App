import React, { useState } from 'react';

interface RoomBookingFormProps {
  userId: string;
  hostelId: string;
}

const RoomBookingForm: React.FC<RoomBookingFormProps> = ({ userId, hostelId }) => {
  const [roomType, setRoomType] = useState<number>(1);
  const [joiningDate, setJoiningDate] = useState<string>('');
  const [totalPrice, setTotalPrice] = useState<number>(10);

  const maxRoomType = 4;

  const handleRoomTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedRoomType = parseInt(event.target.value);
    setRoomType(selectedRoomType);
    setTotalPrice((maxRoomType - selectedRoomType + 1) * 20); // Decrease price as room type increases
  };

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setJoiningDate(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Handle form submission logic here, including using userId and hostelId
    console.log(`User ID: ${userId}, Hostel ID: ${hostelId}, Room Type: ${roomType}, Joining Date: ${joiningDate}, Total Price: ${totalPrice}`);
  };

  return (
    <div className="w-full max-w-lg mx-auto p-8">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-lg font-medium mb-6">Room Booking Information</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="room-type">Room Type</label>
            <select
              id="room-type"
              name="room-type"
              className="w-full py-3 px-4 border border-gray-400 rounded-lg focus:outline-none focus:border-blue-500"
              onChange={handleRoomTypeChange}
              value={roomType}
            >
              <option value="1">1 Seater Room</option>
              <option value="2">2 Seater Room</option>
              <option value="3">3 Seater Room</option>
              <option value="4">4 Seater Room</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="joining-date">Date of Joining</label>
            <input
              type="date"
              id="joining-date"
              name="joining-date"
              className="w-full py-3 px-4 border border-gray-400 rounded-lg focus:outline-none focus:border-blue-500"
              onChange={handleDateChange}
              value={joiningDate}
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="total-price">Total Price</label>
            <input
              type="text"
              id="total-price"
              name="total-price"
              readOnly
              className="w-full py-3 px-4 border border-gray-400 rounded-lg focus:outline-none focus:border-blue-500"
              value={`$${totalPrice}`}
            />
          </div>
          <div className="mt-8">
            <button type="submit" className="w-full bg-green-500 hover:bg-blue-600 text-white font-medium py-3 rounded-lg focus:outline-none">Proceed to checkout</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RoomBookingForm;
