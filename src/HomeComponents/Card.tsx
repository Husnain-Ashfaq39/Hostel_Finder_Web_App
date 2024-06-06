import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CardSkeleton from './CardSkeleton';
import Modal from '../Components/Modal';

interface IHostel {
    id: number;
    name: string;
    description: string;
    hostelOwnerId: number;
    numberOfRooms: number;
    amenities: string;
    location: string;
}

type Props = {
    hostel: IHostel;
    ownercard: boolean;
    userId: number;
};

function Card({ hostel, ownercard, userId }: Props) {
    const [imgurl, setImgUrl] = useState('');
    const [isLoading, setLoading] = useState(false);
    const [isModalOpen, setModalOpen] = useState(false);
    const [isFavorite, setIsFavorite] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const apiKey = 'HD6H7V2ntuv92VFcSnG6EQ3t8OYVP4hsVXjkbZDVEr3dV1wZsOnliBif';
                const response = await fetch(`https://api.pexels.com/v1/search?query=hotel%20room&per_page=1&page=${Math.floor(Math.random() * 100) + 1}&orientation=landscape`, {
                    headers: {
                        Authorization: apiKey
                    }
                });
                const data = await response.json();
                setImgUrl(data.photos[0].src.original);
                setLoading(false);
            } catch (error) {
                console.log('Error:', error);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        const fetchFavoriteStatus = async () => {
            try {
                const response = await fetch(`http://localhost:8080/user/status?userId=${userId}&hostelId=${hostel.id}`);
                if (response.ok) {
                    const data = await response.json();
                    setIsFavorite(data.isFavorite);
                }
            } catch (error) {
                console.error('Error fetching favorite status:', error);
            }
        };

        fetchFavoriteStatus();
    }, [userId, hostel.id]);

    const handleDelete = async () => {
        try {
            const response = await fetch(`http://localhost:8080/hostels/deletehostel/${hostel.id}`, {
                method: 'DELETE',
            });
            if (response.ok) {
                alert('Hostel deleted successfully');
            } else {
                const errorText = await response.text();
                alert(`Failed to delete hostel: ${errorText}`);
            }
        } catch (error: any) {
            console.error('Error deleting hostel:', error);
            alert('Error deleting hostel: ' + error.message);
        }
    };

    const handleEdit = () => {
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
    };

    const toggleFavorite = async () => {
        try {
            if (isFavorite) {
                const response = await fetch(`http://localhost:8080/user/${userId}/wishlist/remove?hostelId=${hostel.id}`, {
                    method: 'DELETE',
                });
                if (response.ok) {
                    setIsFavorite(false);
                } else {
                    const errorText = await response.text();
                    alert(`Failed to remove from favorites: ${errorText}`);
                }
            } else {
                const response = await fetch(`http://localhost:8080/user/${userId}/wishlist/add?hostelId=${hostel.id}`, {
                    method: 'POST',
                });
                if (response.ok) {
                    setIsFavorite(true);
                } else {
                    const errorText = await response.text();
                    alert(`Failed to add to favorites: ${errorText}`);
                }
            }
        } catch (error: any) {
            console.error('Error updating favorite status:', error);
            alert('Error updating favorite status: ' + error.message);
        }
    };

    const handleBooking = () => {
        navigate(`/booking?userId=${userId}&hostelId=${hostel.id}&hostelname=${hostel.name}`);
    };

    if (isLoading) return <CardSkeleton />;

    return (
        <>
            <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow transition-transform transform hover:scale-105">
                <a href="#">
                    <img className="rounded-t-lg" src={imgurl} alt="" />
                </a>
                <div className="p-5">
                    <a href="#">
                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">{hostel.name}</h5>
                    </a>
                    <p className="mb-3 font-normal text-gray-900">{hostel.description}</p>
                    <div className="inline-flex space-x-5">
                        <img className="w-6 h-6" src={"/images/bed.png"} alt="" />
                        <div>Upto 4 </div>
                        {!ownercard && (
                            <div className='flex'>
                                <button onClick={handleBooking} className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                    Book
                                    <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                                    </svg>
                                </button>
                                <img
                                    className='ml-28 cursor-pointer'
                                    src={isFavorite ? "./Images/filled.png" : "./Images/unfilled.png"}
                                    height={10}
                                    width={30}
                                    alt=""
                                    onClick={toggleFavorite}
                                />
                            </div>
                        )}
                        {ownercard && (
                            <>
                                <button onClick={handleEdit} className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-yellow-500 rounded-lg hover:bg-yellow-600 focus:ring-4 focus:outline-none focus:ring-yellow-300 dark:bg-yellow-400 dark:hover:bg-yellow-500 dark:focus:ring-yellow-600">
                                    Edit
                                </button>
                                <button onClick={handleDelete} className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-red-600 rounded-lg hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-700">
                                    Delete
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </div>
            {isModalOpen && <Modal hostel={hostel} onClose={closeModal} />}
        </>
    );
}

export default Card;
