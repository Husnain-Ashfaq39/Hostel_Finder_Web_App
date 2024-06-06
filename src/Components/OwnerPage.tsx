import React, { useEffect, useState } from 'react';
import NavbarOwnerpage from '../OwnerPageComponents/NavBar';
import Card from "../HomeComponents/Card";
import { useMyContext } from '../context/MyContext';

interface IHostel {
    id: number;
    name: string;
    description: string;
    hostelOwnerId: number;
    numberOfRooms: number;
    amenities: string;
    location: string;
}

const OwnerPage = () => {
    const [hostels, setHostels] = useState<IHostel[]>([]);
    const { owner,user } = useMyContext();

    useEffect(() => {
        fetch('http://localhost:8080/hostels/getall')
            .then(res => res.json())
            .then(data => {
                console.log(data);
                
                setHostels(data);
            })
            .catch(error => console.error("Failed to fetch hostels:", error));
    }, []);

    return (
        <div className="min-h-screen bg-white text-blue-800">
            <NavbarOwnerpage /> {/* Reusing the Navbar component */}
            <div className="p-10">
                <h2 className="text-2xl font-bold mb-8">Welcome to Your Dashboard</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
                    {owner.id !== 0 && hostels.map(hostel => (
                        hostel.hostelOwnerId === owner.id && <Card ownercard={true} userId={user.id}key={hostel.id} hostel={hostel} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default OwnerPage;
