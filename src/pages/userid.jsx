import React, { useState } from "react";
import axios from "axios";

const UserIdPage = ({ token }) => {
  const [userId, setUserId] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        "http://localhost:4000/userid",
        { userId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      localStorage.setItem("token", response.data.token);
      window.location.href = "/home";
    } catch (err) {
      setError(err.response.data.message || "Error setting userId");
    }
  };

  return (
    <div>
      <h2>Set Your Unique User ID</h2>
      <input
        type="text"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
        placeholder="Enter your unique userId"
      />
      <button onClick={handleSubmit}>Submit</button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default UserIdPage;
