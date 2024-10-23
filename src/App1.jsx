import React, { useState } from 'react';
import App from './App';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Modal from './components/Modal/Modal'; // Import Modal component
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import './App1.css'; // Import CSS file

const App1 = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  // State for PlanTrip component
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [tripType, setTripType] = useState("Solo Trip");
  const [numMembers, setNumMembers] = useState(1);
  const [budget, setBudget] = useState("");

  const openModal = (message) => {
    setModalMessage(message); // Set the message to display in the modal
    setModalOpen(true); // Open the modal
  };

  const closeModal = () => {
    setModalOpen(false); // Close the modal
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!startDate || !endDate || !budget) {
      openModal("Please fill in all the details."); // Trigger modal for missing details
      return;
    }
    console.log("Start Date:", startDate);
    console.log("End Date:", endDate);
    console.log("Trip Type:", tripType);
    if (tripType === "Family trip" || tripType === "Friends Trip") {
      console.log("Number of Members:", numMembers);
    }
    console.log("Budget:", budget);
  };

  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/plan-trip" element={
            <div className="plan-trip-container">
              <h2>When are you going?</h2>
              <p className="subtitle">Choose a date range, up to 7 days.</p>
              <form onSubmit={handleSubmit}>
                {/* Date Selection */}
                <div className="calendar-container">
                  <div className="calendar">
                    <label htmlFor="start-date">Start Date:</label>
                    <DatePicker
                      selected={startDate}
                      onChange={(date) => setStartDate(date)}
                      selectsStart
                      startDate={startDate}
                      endDate={endDate}
                      dateFormat="MMMM d, yyyy"
                      placeholderText="Select Start Date"
                      className="custom-calendar"
                    />
                  </div>
                  <div className="calendar">
                    <label htmlFor="end-date">End Date:</label>
                    <DatePicker
                      selected={endDate}
                      onChange={(date) => setEndDate(date)}
                      selectsEnd
                      startDate={startDate}
                      endDate={endDate}
                      minDate={startDate}
                      maxDate={new Date(startDate?.getTime() + 7 * 24 * 60 * 60 * 1000)}
                      dateFormat="MMMM d, yyyy"
                      placeholderText="Select End Date"
                      className="custom-calendar"
                    />
                  </div>
                </div>

                {/* Trip Type Selection */}
                <h2>What kind of trip are you planning?</h2>
                <div className="trip-options">
                  {["Solo Trip", "Partner trip", "Friends Trip", "Family trip"].map((type) => (
                    <div
                      key={type}
                      className={`trip-option ${tripType === type ? "selected" : ""}`}
                      onClick={() => setTripType(type)}
                    >
                      {type}
                    </div>
                  ))}
                </div>

                {/* Conditional Input for Number of Members */}
                {(tripType === "Family trip" || tripType === "Friends Trip") && (
                  <div className="num-members-container">
                    <label htmlFor="num-members">Number of members:</label>
                    <input
                      id="num-members"
                      type="number"
                      min="1"
                      value={numMembers}
                      onChange={(e) => setNumMembers(e.target.value)}
                      className="num-members-input"
                    />
                  </div>
                )}

                {/* Budget Selection */}
                <h2>The Budgeting Blueprint</h2>
                <div className="budget-options">
                  {["Low", "Medium", "High"].map((option) => (
                    <div
                      key={option}
                      className={`budget-option ${budget === option ? "selected" : ""}`}
                      onClick={() => setBudget(option)}
                    >
                      {option}
                    </div>
                  ))}
                </div>

                <button type="submit" className="submit-button">Plan Trip</button>
              </form>
            </div>
          } />
        </Routes>

        {/* Include the Modal here */}
        <Modal show={isModalOpen} onClose={closeModal} message={modalMessage} />
      </div>
    </Router>
  );
}

export default App1;
