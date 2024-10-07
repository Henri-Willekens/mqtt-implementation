// ./components/atoms/Heading/Autopilotinput.tsx
import React, { useState } from "react";

interface SendNumberProps {
  onSendNumber: (topic: string, number: number) => void;
}

const SendNumber: React.FC<SendNumberProps> = ({ onSendNumber }) => {
  const [topic, setTopic] = useState("test/heading"); // Default topic
  const [number, setNumber] = useState<number | null>(null); // State to hold the number

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Convert input value to a number or set to null if NaN
    const parsedValue = parseFloat(value);
    setNumber(isNaN(parsedValue) ? null : parsedValue); // Set number to null if NaN
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (number !== null) {
      onSendNumber(topic, number); // Call the send function only if number is valid
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={topic} // Always a string
        onChange={(e) => setTopic(e.target.value)}
        placeholder="Enter Topic"
      />
      <input
        type="number" // Use number input for better validation
        value={number !== null ? number : ""} // Handle NaN by providing an empty string
        onChange={handleNumberChange}
        placeholder="Enter Number"
      />
      <button type="submit">Send Number</button>
    </form>
  );
};

export default SendNumber;