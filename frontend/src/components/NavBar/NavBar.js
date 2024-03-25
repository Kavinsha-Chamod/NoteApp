import React from "react";
import "./NavBar.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../redux/users/userAction";

export default function NavBar() {
  const nav = useNavigate();
  const dispatch = useDispatch();
  const isAuthenticated = localStorage.getItem("token");
  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to logout?");
    if (confirmLogout) {
      dispatch(logoutUser());
    }
  };
  return (
    <div className="header">
      <a href="/notes" className="logo">
        MY NOTES
      </a>
      <div className="header-right">
        {isAuthenticated ? (
          <button onClick={handleLogout}>Logout</button>
        ) : (
          <button onClick={() => nav("/register")}>Register</button>
        )}
      </div>
    </div>
  );
}
