import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface RoomBookingFormProps {
  userId: string;
  hostelId: string;
}

const RoomBookingForm: React.FC<RoomBookingFormProps> = ({ userId, hostelId }) => {
  const [roomType, setRoomType] = useState<number>(1);
  const [joiningDate, setJoiningDate] = useState<string>('');
  const [totalPrice, setTotalPrice] = useState<number>(10);
  const [dateError, setDateError] = useState<string>('');
  const navigate = useNavigate();

  const maxRoomType = 4;

  const handleRoomTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedRoomType = parseInt(event.target.value);
    setRoomType(selectedRoomType);
    setTotalPrice((maxRoomType - selectedRoomType + 1) * 20); // Decrease price as room type increases
  };

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setJoiningDate(event.target.value);
  };

  const validateDate = (dateString: string) => {
    const today = new Date();
    const selectedDate = new Date(dateString);

    // Ensure the date is not in the past
    if (selectedDate < today) {
      return 'Joining date cannot be in the past';
    }

    // Ensure the date is within the next year (for example)
    const nextYear = new Date(today);
    nextYear.setFullYear(today.getFullYear() + 1);
    if (selectedDate > nextYear) {
      return 'Joining date cannot be more than one year in the future';
    }

    return '';
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    // Validate the joining date
    if (!joiningDate) {
      setDateError('Joining date cannot be empty');
      return;
    }

    const dateValidationError = validateDate(joiningDate);
    if (dateValidationError) {
      setDateError(dateValidationError);
      return;
    }

    // Clear any previous date error
    setDateError('');

    // Navigate to payment page with state
    navigate('/payment', {
      state: {
        userId,
        hostelId,
        roomType: `${roomType} Seater Room`,
        totalPrice,
      },
    });
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
            {dateError && <p className="text-red-500 text-sm mt-2">{dateError}</p>}
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
            <button type="submit" className="w-full bg-green-500 hover:bg-blue-600 text-white font-medium py-3 rounded-lg focus:outline-none">Proceed to Payment</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RoomBookingForm;
