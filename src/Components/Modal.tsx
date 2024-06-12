import React, { useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';

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

const Modal: React.FC<ModalProps> = ({ hostel, onClose }) => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<IHostel>();

  useEffect(() => {
    reset(hostel);
  }, [hostel, reset]);

  const onSubmit: SubmitHandler<IHostel> = async (data) => {
    try {
      const response = await fetch(`http://localhost:8080/hostels/updatehostel/${hostel.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        alert('Hostel updated successfully');
        onClose();
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
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label className="block mb-2">Name</label>
            <input
              type="text"
              {...register('name', { required: 'Name is required' })}
              className={`w-full px-3 py-2 border rounded-lg ${errors.name ? 'border-red-500' : ''}`}
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
          </div>
          <div className="mb-4">
            <label className="block mb-2">Description</label>
            <textarea
              {...register('description', { required: 'Description is required' })}
              className={`w-full px-3 py-2 border rounded-lg ${errors.description ? 'border-red-500' : ''}`}
            />
            {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>}
          </div>
          <div className="mb-4">
            <label className="block mb-2">Number of Rooms</label>
            <input
              type="number"
              {...register('numberOfRooms', { required: 'Number of Rooms is required', valueAsNumber: true })}
              className={`w-full px-3 py-2 border rounded-lg ${errors.numberOfRooms ? 'border-red-500' : ''}`}
            />
            {errors.numberOfRooms && <p className="text-red-500 text-sm mt-1">{errors.numberOfRooms.message}</p>}
          </div>
          <div className="mb-4">
            <label className="block mb-2">Amenities</label>
            <input
              type="text"
              {...register('amenities', { required: 'Amenities are required' })}
              className={`w-full px-3 py-2 border rounded-lg ${errors.amenities ? 'border-red-500' : ''}`}
            />
            {errors.amenities && <p className="text-red-500 text-sm mt-1">{errors.amenities.message}</p>}
          </div>
          <div className="mb-4">
            <label className="block mb-2">Location</label>
            <input
              type="text"
              {...register('location', { required: 'Location is required' })}
              className={`w-full px-3 py-2 border rounded-lg ${errors.location ? 'border-red-500' : ''}`}
            />
            {errors.location && <p className="text-red-500 text-sm mt-1">{errors.location.message}</p>}
          </div>
          <div className="flex justify-end space-x-4">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-400 rounded-lg text-white">
              Cancel
            </button>
            <button type="submit" className="px-4 py-2 bg-blue-600 rounded-lg text-white">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modal;
