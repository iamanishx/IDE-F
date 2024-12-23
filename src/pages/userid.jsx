import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setToken } from "../redux/authSlice";
import axios from "axios";
import "./Userid.css";  


const UserIdPage = () => {  
  const [userId, setUserId] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();  
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    // Retrieve the token from the URL and store it in localStorage
    const urlToken = new URLSearchParams(window.location.search).get("token");
    if (urlToken) {
      dispatch(setToken(urlToken));
      localStorage.setItem("token", urlToken);
      
    }
  }, [dispatch]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(""); 
  
    if (!userId.trim()) {
      setError("User ID cannot be empty.");
      return;
    }
  
    if (!token) {
      setError("You are not authorized. Please log in again.");
      return;
    }
  
    try {
      const response = await axios.post(
        "http://localhost:3000/auth/userid",
        { userId },
        {
          headers: {
            Authorization: `Bearer ${token}`,  
          },
        }
      );
  
      console.log("User ID set successfully:", response.data);
  
      // Update the token in localStorage with the new one from the response
      const newToken = response.data.token;
      if (newToken) {
        dispatch(setToken(newToken));
      }
  
      // Redirect to the homepage after successful submission
      navigate("/home");
    } catch (error) {
      console.error("Error setting userId:", error.response?.data || error.message);
      setError(error.response?.data?.message || "An error occurred. Please try again.");
    }
  };
  

  return (
    <div className="animate-fadeIn flex flex-col items-center justify-center min-h-screen bg-black relative">
      {/* Blurred Background Layer */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-gray-800 opacity-80 blur-sm"></div>
  
      {/* Content Box */}
      <div className="relative z-10 flex flex-col items-center justify-center">
        <h2 className="text-3xl font-extrabold mb-6 text-white drop-shadow-lg animate-bounce">
          Set Your Unique User ID
        </h2>
        <form 
          onSubmit={handleSubmit} 
          className="flex flex-col gap-6 p-8 bg-gradient-to-br from-gray-700 to-gray-900 rounded-xl shadow-2xl animate-slideUp border border-gray-600"
        >
          <input
            type="text"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            placeholder="Enter your unique userId"
            className="px-4 py-3 text-lg border rounded focus:ring-2 focus:ring-purple-500 bg-gray-800 text-white placeholder-gray-400 border-gray-600 shadow-inner"
          />
          <button
            type="submit"
            className="px-4 py-3 bg-purple-600 text-white text-lg font-semibold rounded-lg hover:bg-purple-700 transition duration-300 shadow-lg hover:shadow-purple-500/50"
          >
            Submit
          </button>
        </form>
        {error && <p className="text-red-400 mt-4 animate-pulse text-lg font-semibold">{error}</p>}
      </div>
    </div>
  );
  
  
}
  

export default UserIdPage;
