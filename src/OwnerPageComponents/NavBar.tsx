import React from 'react';
import { Link } from 'react-router-dom';
import { useMyContext } from '../context/MyContext';

const NavbarOwnerpage = () => {
    const { owner } = useMyContext();
    return (
        <nav className="bg-blue-500 text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <h1 className="text-xl md:text-2xl font-bold">Hostify</h1>
                    <div className="hidden md:flex space-x-4">
                        <Link to="/addhostel" className="px-3 py-2 rounded-lg hover:bg-blue-700 transition duration-300 ease-in-out font-semibold">
                            Add New Hostel
                        </Link>
                        
                        <Link to="/manage-profile" className="px-3 py-2 rounded-lg hover:bg-blue-700 transition duration-300 ease-in-out font-semibold">
                            Manage Profile
                        </Link>
                        {owner.firstname ? (
                            <Link to="/manage-profile" className="px-3 py-2 rounded-lg hover:bg-blue-700 transition duration-300 ease-in-out font-semibold">
                                {owner.firstname}
                            </Link>
                        ) : (
                            <Link to="/login" className="px-3 py-2 rounded-lg hover:bg-blue-700 transition duration-300 ease-in-out font-semibold">
                                login
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default NavbarOwnerpage;
