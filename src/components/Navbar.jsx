import React, { useState, useEffect } from "react";
import "./Navbar.css";

export const Navbar = () => {
  const [userId, setUserId] = useState("Fetching..."); // Placeholder for user ID
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    // Simulate fetching user ID from a database
    setTimeout(() => {
      setUserId("User123"); // Replace with your API/database call
    }, 1000);
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
        <span className="nav-link">Feedback</span>
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
