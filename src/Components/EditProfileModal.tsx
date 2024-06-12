import React, { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';

interface User {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
}

interface EditProfileModalProps {
  userId: number;
  isOpen: boolean;
  onClose: () => void;
  onSave: (user: User) => void;
}

const EditProfileModal: React.FC<EditProfileModalProps> = ({ userId, isOpen, onClose, onSave }) => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<User>();
  const [user, setUser] = useState<User>({ id: 0, firstname: '', lastname: '', email: '' });

  useEffect(() => {
    if (userId && isOpen) {
      // Fetch user data from the backend
      fetch(`http://localhost:8080/user/${userId}`)
        .then(response => response.json())
        .then(data => {
          setUser(data);
          reset(data);
        });
    }
  }, [userId, isOpen, reset]);

  const onSubmit: SubmitHandler<User> = (data) => {
    onSave(data);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50 animate-fadeIn">
      <div className="bg-white p-8 rounded-lg shadow-lg z-50 w-full max-w-2xl mx-4 sm:mx-auto transform animate-slideUp">
        <h2 className="text-3xl mb-6 font-semibold text-gray-800">Edit Profile</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label className="block mb-2 text-gray-700">First Name</label>
            <input
              type="text"
              {...register('firstname', { required: 'First name is required' })}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.firstname ? 'border-red-500' : ''}`}
            />
            {errors.firstname && <p className="text-red-500 text-sm mt-1">{errors.firstname.message}</p>}
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-gray-700">Last Name</label>
            <input
              type="text"
              {...register('lastname', { required: 'Last name is required' })}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.lastname ? 'border-red-500' : ''}`}
            />
            {errors.lastname && <p className="text-red-500 text-sm mt-1">{errors.lastname.message}</p>}
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-gray-700">Email</label>
            <input
              type="email"
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: 'Invalid email address',
                },
              })}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.email ? 'border-red-500' : ''}`}
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
          </div>
          <div className="flex justify-end">
            <button type="button" onClick={onClose} className="px-6 py-2 bg-gray-300 rounded-lg mr-2 hover:bg-gray-400 transition duration-300">Cancel</button>
            <button type="submit" className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300">Save</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfileModal;
