import React, { useEffect, useState } from "react";
import Navbar from "../HomeComponents/Navbar";

import Card from "../HomeComponents/Card";
import { useMyContext } from "../context/MyContext";
import { useNavigate } from "react-router-dom";
// Define interface for hostel data
interface IHostel {
  id: number;
  name: string;
  description: string;
  hostelOwnerId: number;
  numberOfRooms: number;
  amenities: string;
  location: string;
}

function Home() {
  const [allHostels, setAllHostels] = useState<IHostel[]>([]);
  const [hostels, setHostels] = useState<IHostel[]>([]);
  const [input, setInput] = useState("");
  const [selectedHostel, setSelectedHostel] = useState<IHostel | null>(null);
  const { user } = useMyContext();
  const navigate = useNavigate();
  if (!user.id) {
    navigate('/login');
  }
  useEffect(() => {
    fetch('http://localhost:8080/hostels/getall')
      .then(res => res.json())
      .then(data => {
        setAllHostels(data);
        setHostels(data);
      })
      .catch(error => console.error("Failed to fetch hostels:", error));
  }, []);

  useEffect(() => {
    if (selectedHostel) {
      setHostels([selectedHostel]);
    } else if (input.trim() !== "") {
      const filteredHostels = allHostels.filter(hostel =>
        hostel.name.toLowerCase().includes(input.toLowerCase())
      );
      setHostels(filteredHostels);
    } else {
      setHostels(allHostels);
    }
  }, [input, allHostels, selectedHostel]);

  const handleChange = (value: string, hostel?: IHostel) => {
    if (hostel) {
      setSelectedHostel(hostel);
      setInput("");
    } else {
      setInput(value);
    }
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4">
        <h1 className="text-center text-4xl font-semibold py-10 text-gray-800">
          Last Minute Deals
        </h1>
        <div className="max-w-md mx-auto">
          <input
            type="search"
            className="form-input w-full rounded-full px-4 py-2 border-2 border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 shadow-sm transition ease-in-out"
            placeholder="Explore available hostels..."
            onChange={(e) => handleChange(e.target.value)}
          />
        </div>
        {input.trim() !== "" && (
          <div className="bg-white rounded-md shadow-lg mt-4 overflow-y-auto max-h-60 max-w-md mx-auto">
            {hostels.map((hostel) => (
              <div
                key={hostel.id}
                className="p-2 hover:bg-blue-50 cursor-pointer"
                onClick={() => handleChange("", hostel)}
              >
                {hostel.name}
              </div>
            ))}
          </div>
        )}
        <div className="py-5 max-w-xs mx-auto">

        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
          {hostels.map(hostel => {

            return <Card wishlist={false} ownercard={false} userId={user.id} key={hostel.id} hostel={hostel} />
          })}
        </div>
      </div>
    </>
  );
}

export default Home;
