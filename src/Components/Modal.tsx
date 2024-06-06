import React, { useState } from 'react';

interface IHostel {
    id: number;
    name: string;
    description: string;
    hostelOwnerId: number;
    numberOfRooms: number;
    amenities: string;
    location: string;
}

interface ModalProps {
    hostel: IHostel;
    onClose: () => void;
}

const Modal = ({ hostel, onClose }: ModalProps) => {
    const [name, setName] = useState(hostel.name);
    const [description, setDescription] = useState(hostel.description);
    const [hostelOwnerId, setHostelOwnerId] = useState(hostel.hostelOwnerId);
    const [numberofrooms, setNumberOfRooms] = useState(hostel.numberOfRooms);
    const [amenities, setAmenities] = useState(hostel.amenities);
    const [location, setLocation] = useState(hostel.location);

    const handleSave = async () => {
        try {
            const response = await fetch(`http://localhost:8080/hostels/updatehostel/${hostel.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name,
                    description,
                    hostelOwnerId,
                    numberofrooms,
                    amenities,
                    location,
                }),
            });
            if (response.ok) {
                alert('Hostel updated successfully');
                onClose();
                // Optionally, refresh the list of hostels or update this hostel in the UI
            } else {
                alert('Failed to update hostel');
            }
        } catch (error) {
            console.error('Error updating hostel:', error);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-auto bg-black bg-opacity-50">
            <div className="bg-white p-8 rounded-lg shadow-lg w-3/4">
                <h2 className="text-2xl mb-4">Edit Hostel</h2>
                <div className="mb-4">
                    <label className="block mb-2">Name</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-3 py-2 border rounded-lg"
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-2">Description</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full px-3 py-2 border rounded-lg"
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-2">Hostel Owner ID</label>
                    <input
                        type="number"
                        value={hostelOwnerId}
                        onChange={(e) => setHostelOwnerId(Number(e.target.value))}
                        className="w-full px-3 py-2 border rounded-lg"
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-2">Number of Rooms</label>
                    <input
                        type="number"
                        value={numberofrooms}
                        onChange={(e) => setNumberOfRooms(Number(e.target.value))}
                        className="w-full px-3 py-2 border rounded-lg"
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-2">Amenities</label>
                    <input
                        type="text"
                        value={amenities}
                        onChange={(e) => setAmenities(e.target.value)}
                        className="w-full px-3 py-2 border rounded-lg"
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-2">Location</label>
                    <input
                        type="text"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        className="w-full px-3 py-2 border rounded-lg"
                    />
                </div>
                <div className="flex justify-end space-x-4">
                    <button onClick={onClose} className="px-4 py-2 bg-gray-400 rounded-lg text-white">
                        Cancel
                    </button>
                    <button onClick={handleSave} className="px-4 py-2 bg-blue-600 rounded-lg text-white">
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Modal;
