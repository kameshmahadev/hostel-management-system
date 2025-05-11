import React, { useEffect, useState } from "react";
import axios from "axios";

const RoomAllocation = () => {
  const [rooms, setRooms] = useState([]);
  
  useEffect(() => {
    axios.get("http://localhost:5000/api/rooms")
      .then(res => setRooms(res.data))
      .catch(err => console.error(err));
  }, []);
  
  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-4">Room Allocation</h1>
      <div className="grid grid-cols-3 gap-4">
        {rooms.map(room => (
          <div key={room._id} className="border p-4 rounded-lg">
            <h2 className="text-xl">{room.roomNumber}</h2>
            <p>Type: {room.roomType}</p>
            <p>Price: ${room.price}</p>
            <button className="bg-blue-500 text-white px-4 py-2 rounded mt-2">
              Assign Room
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RoomAllocation;
