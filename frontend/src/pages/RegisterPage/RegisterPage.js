import React, { useState } from "react";
import "./RegisterPage.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../redux/users/userAction";

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const { loading, error, successMessage } = useSelector((state) => state);
  const dispatch = useDispatch();
  const nav = useNavigate();

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    dispatch(registerUser(formData))
  };

  return (
    <div className="register_page">
      <div className="reg_form_container">
        <form onSubmit={handleSignup}>
          <div className="container">
            <h1>Register Yourself!</h1>
            <hr />
            <label htmlFor="name">
              <b>Name</b>
            </label>
            <input
              value={formData.name}
              onChange={handleInputChange}
              type="text"
              placeholder="Enter your Name"
              name="name"
              required
            />

            <label htmlFor="email">
              <b>Email</b>
            </label>
            <input
              value={formData.email}
              onChange={handleInputChange}
              type="text"
              placeholder="Enter your Email"
              name="email"
              required
            />

            <label htmlFor="password">
              <b>Password</b>
            </label>
            <input
              value={formData.password}
              onChange={handleInputChange}
              type={showPassword ? "text" : "password"}
              placeholder="Enter your Password"
              name="password"
              required
            />

            <label htmlFor="confirmPassword">
              <b>Confirm Password</b>
            </label>
            <input
              value={formData.confirmPassword}
              onChange={handleInputChange}
              type={showPassword ? "text" : "password"}
              placeholder="Confirm your Password"
              name="confirmPassword"
              required
            />
            <div className="clearfix">
              <button type="submit" className="signupbtn">
                Register
              </button>
              <p>
                Already have an account?{" "}
                <a href="/login" style={{ color: "dodgerblue" }}>
                  Login here
                </a>
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
