import React, { useEffect, useState } from "react";
import Card from "../HomeComponents/Card";
import { useMyContext } from "../context/MyContext";
import Navbar from "../HomeComponents/Navbar";
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
const Wishlist = () => {
  const [allHostels, setAllHostels] = useState<IHostel[]>([]);
  const [hostels, setHostels] = useState<IHostel[]>([]);
  const [input, setInput] = useState("");
  const [selectedHostel, setSelectedHostel] = useState<IHostel | null>(null);
  const { user } = useMyContext();
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

  
  return (
    <>
      <Navbar></Navbar>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
        {hostels.map(hostel => {

          return <Card wishlist={true} ownercard={false} userId={user.id} key={hostel.id} hostel={hostel} />
        })}
      </div>
    </>
  )
}

export default Wishlist