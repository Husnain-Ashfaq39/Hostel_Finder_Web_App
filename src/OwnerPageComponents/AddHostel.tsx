import React from 'react';
import { FieldValues, useForm, SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

type Props = {
  hostelOwnerId: number;
};

interface HostelFormInputs {
  name: string;
  description: string;
  rooms: number;
  amenities: string;
  location: string;
}

const AddHostel: React.FC<Props> = ({ hostelOwnerId }) => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<HostelFormInputs>();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<HostelFormInputs> = async (data) => {
    console.log("hostelownerid" + hostelOwnerId);
    console.log(data);

    try {
      const response = await fetch("http://localhost:8080/hostels/addhostel", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: data.name,
          description: data.description,
          hostelOwnerId: hostelOwnerId,
          numberOfRooms: data.rooms,
          amenities: data.amenities,
          location: data.location
        })
      });

      if (response.ok) {
        navigate('/popmodel');
      } else {
        alert('Failed to add hostel');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-5 bg-blue-100 rounded-lg">
      <form onSubmit={handleSubmit(onSubmit)}>
        <h2 className="text-2xl font-bold mb-4">Add Hostel</h2>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">Name:</label>
          <input
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.name ? 'border-red-500' : ''}`}
            id="name"
            type="text"
            {...register("name", { required: 'Name is required' })}
          />
          {errors.name && <span className="text-red-500 text-xs italic">{errors.name.message}</span>}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">Description:</label>
          <input
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.description ? 'border-red-500' : ''}`}
            id="description"
            type="text"
            {...register("description", { required: 'Description is required' })}
          />
          {errors.description && <span className="text-red-500 text-xs italic">{errors.description.message}</span>}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="rooms">Rooms:</label>
          <input
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.rooms ? 'border-red-500' : ''}`}
            id="rooms"
            type="number"
            {...register("rooms", { required: 'Number of rooms is required', valueAsNumber: true })}
          />
          {errors.rooms && <span className="text-red-500 text-xs italic">{errors.rooms.message}</span>}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="amenities">Amenities:</label>
          <input
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.amenities ? 'border-red-500' : ''}`}
            id="amenities"
            type="text"
            {...register("amenities", { required: 'Amenities are required' })}
          />
          {errors.amenities && <span className="text-red-500 text-xs italic">{errors.amenities.message}</span>}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="location">Location:</label>
          <input
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.location ? 'border-red-500' : ''}`}
            id="location"
            type="text"
            {...register("location", { required: 'Location is required' })}
          />
          {errors.location && <span className="text-red-500 text-xs italic">{errors.location.message}</span>}
        </div>
        
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">Submit</button>
       
      </form>
    </div>
  );
};

export default AddHostel;
