import React, { useState } from "react";
import "./Dashboard.css";
import axios from "axios";


const AddRoomModal = ({ onAddRoom, onClose }) => {
  const [newRoom, setNewRoom] = useState({
    roomNumber: "",
    roomCapacity: "",
    roomLocation: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewRoom((prevRoom) => ({
      ...prevRoom,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setError("");

    try {

      const response = await axios.post("https://hostel-management-3ztc.vercel.app/room/create", newRoom);
      onAddRoom(response.data);
      onClose()

    } catch (error) {
      setError("Failed to add room", error);
      console.error(error)
    } finally {
      setIsSubmitting(false)
    }

  };

  return (
    <div className="modal">
      <div className="modal-content --flex-start --dir-column">
        <h2 className="modal-title">Add New Room</h2>
        <label htmlFor="roomNumber" className="room-label">
          Room Number:
        </label>
        <input
          type="text"
          id="roomNumber"
          name="roomNumber"
          value={newRoom.roomNumber}
          onChange={handleChange}
          className="input-field"
        />
        <label htmlFor="roomCapacity" className="room-label">
          Capacity:
        </label>
        <input
          type="text"
          id="roomCapacity"
          name="roomCapacity"
          value={newRoom.roomCapacity}
          onChange={handleChange}
          className="input-field"
        />
        
        
        <label htmlFor="roomLocation" className="room-label">
          Location:
        </label>
        <input
          type="text"
          id="roomLocation"
          name="roomLocation"
          value={newRoom.roomLocation}
          onChange={handleChange}
          className="input-field"
        />

        {error && <p>{error}</p>}

        <div className="button-group">
          <button className="save-button" onClick={handleSubmit} disabled={isSubmitting}>
            {isSubmitting ? "Adding..." : "Add"}
          </button>
          <button className="cancel-button" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddRoomModal;
