import React, { useState, useEffect } from "react";
import "./Navbar.css";

export const Navbar = () => {
  const [userId, setUserId] = useState("Fetching..."); // Placeholder for user ID
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setUserId('Not logged in');
        return;
      }
      try {
        const response = await fetch('http://localhost:3000/auth/user', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        const userData = await response.json();
        setUserId(userData.userId);  
      } catch (error) {
        console.error('Error fetching user:', error);
        setUserId('Error loading user');
      }
    };

    fetchUser();
  }, []);

  return (
    <div className="navbar">
      {/* Left side */}
      <div className="navbar-left">
        <span className="user-id">{userId}'s Projects</span>
      </div>

      {/* Right side */}
      <div className="navbar-right">
        {/* Feedback, Help, Docs */}
        <button className="nav-link">Feedback</button>
        <span className="nav-link">Help</span>
        <span className="nav-link">Docs</span>

        {/* Dropdown menu */}
        <div
          className="dropdown"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <div className="profile-icon"></div>
          {menuOpen && (
            <div className="dropdown-menu">
              <a href="/account-settings">Account Settings</a>
              <a href="/create-team">Create Team</a>
              <a href="/dashboard">Dashboard</a>
              <a href="/logout">Log Out</a>
              <button className="upgrade-btn">Upgrade to Pro</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

function App() {
  return (
    <div>
      <Navbar />
    </div>
  );
}

export default Navbar;
