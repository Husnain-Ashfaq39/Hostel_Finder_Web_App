import { describe } from 'node:test';
import React, { useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';


type Props = {
  hostelOwnerId: number;
};

const AddHostel: React.FC<Props> = ({ hostelOwnerId }) => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const navigate = useNavigate();




  const onSubmit = async (data: FieldValues) => {
    // Attach the hostelOwnerId to the form data
    
    console.log("hostelownerid"+hostelOwnerId);
    
    console.log(data);
  
   

    try {
      const response = await fetch("http://localhost:8080/hostels/addhostel", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          "name":data.name,
          "description":data.description,
          "hostelOwnerId":hostelOwnerId,
          "numberOfRooms":data.rooms,
          "amenities":data.amenities,
          "location":data.location

      })
      });

      if (response.ok) {
        navigate('/popmodel');
      } else {
        
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
          <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="name" type="text" {...register("name", { required: true})} />
          {errors.name && <span className="text-red-500 text-xs italic">This field is required</span>}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">Description:</label>
          <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="description" type="text" {...register("description", { required: true })} />
          {errors.description && <span className="text-red-500 text-xs italic">This field is required</span>}
        </div>

        
        

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="rooms">Rooms:</label>
          <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="rooms" type="number" {...register("rooms", { required: true })} />
          {errors.rooms && <span className="text-red-500 text-xs italic">This field is required</span>}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="amenities">Amenities:</label>
          <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="amenities" type="text" {...register("amenities", { required: true })} />
          {errors.amenities && <span className="text-red-500 text-xs italic">This field is required</span>}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="location">Location:</label>
          <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="location" type="text" {...register("location", { required: true })} />
          {errors.location && <span className="text-red-500 text-xs italic">This field is required</span>}
        </div>
        
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">Submit</button>
       
      </form>
     
    </div>
  );
};

export default AddHostel;