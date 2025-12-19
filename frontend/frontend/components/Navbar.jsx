import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="navbar">
      <h2>🚨 Emergency App</h2>

      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/emergency">Emergency</Link>

        {user ? (
          <>
            <span className="username">
              Welcome, <b>{user?.username}</b> ✅
            </span>
            <button onClick={logout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
            <Link to="/my-contacts">My Contacts</Link>

          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
