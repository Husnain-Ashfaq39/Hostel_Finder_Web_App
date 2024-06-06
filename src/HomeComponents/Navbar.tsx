import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import EditProfileModal from '../Components/EditProfileModal';
import { useMyContext } from '../context/MyContext';

interface User {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
}

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User>({ id: 0, firstname: '', lastname: '', email: '' });
  const [isModalOpen, setModalOpen] = useState(false);
  const { user: uss } = useMyContext();

  useEffect(() => {
    // Fetch user data from the backend on component mount
    const userId = uss.id; // Replace with actual user ID or fetch from localStorage/session
    fetch(`http://localhost:8080/user/${userId}`)
      .then(response => response.json())
      .then(data => setUser(data));
  }, [uss.id]);

  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);

  const handleSaveUser = (updatedUser: User) => {
    setUser(updatedUser);
    // Save updated user data to the backend
    fetch(`http://localhost:8080/user/update/${updatedUser.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedUser),
    }).then(response => {
      if (response.ok) {
        // Optionally, handle success
      } else {
        // Optionally, handle error
      }
    });
  };

  return (
    <>
      <nav className="bg-white border-gray-200">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
            <img src="./Images/logo.avif" className="h-8 rounded-lg" alt="Flowbite Logo" />
            <span className="self-center text-2xl font-semibold whitespace-nowrap">Hostify</span>
          </a>
          <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
            {user.id === 0 ? (
              <button
                onClick={() => navigate('/Login')}
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center"
              >
                Login
              </button>
            ) : (
              <div className="flex items-center gap-4">
                {/* profile icon */}
                <svg onClick={handleOpenModal} className="w-10 h-10 rounded-full cursor-pointer" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path>
                </svg>
                <div className="font-medium dark:text-white">
                  <div>{user.firstname ? <p>{user.firstname}</p> : <p>Username</p>}</div>
                </div>
                <img className=' ml-4' src="./Images/wishlist_icon.png" alt="wishlist" height={10} width={30} />
              </div>
            )}
          </div>
          <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-cta">
            <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white">
              <li>
                <a href="/" className="block py-2 px-3 md:p-0 text-gray-900 rounded bg-blue-700 md:bg-transparent md:text-blue-700" aria-current="page">Home</a>
              </li>
              <li>
                <a href="#" className="block py-2 px-3 md:p-0 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700">About</a>
              </li>
              <li>
                <a href="#" className="block py-2 px-3 md:p-0 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700">Services</a>
              </li>
              <li>
                <a href="#" className="block py-2 px-3 md:p-0 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700">Contact</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
     
      <EditProfileModal
        userId={uss.id}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSave={handleSaveUser}
      />
    </>
  );
}

export default Navbar;
