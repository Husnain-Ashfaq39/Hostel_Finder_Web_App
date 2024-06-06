import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const PopupModal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(true);
  const navigate = useNavigate();

  const closeModal = () => {
    setIsOpen(false);
    navigate("/ownerpage")
  };

  // Optional: Automatically close the modal after a certain time
  useEffect(() => {
    const timer = setTimeout(() => {
      closeModal();
    }, 5000); // close after 5000 milliseconds (5 seconds)

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-5 rounded-lg shadow-lg text-center">
            <h2 className="text-lg font-bold mb-4">Your Hostel is Successfully Added</h2>
            <button 
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 focus:outline-none"
              onClick={closeModal}
            >
              Continue
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default PopupModal;
