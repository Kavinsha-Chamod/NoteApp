import React, { useState, useEffect } from "react";
import "./LoginPage.css";
import NavBar from "../../components/NavBar/NavBar";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../../redux/users/userAction";

export default function LoginPage() {
  const { auth, loading } = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();
  const nav = useNavigate();


  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (auth) {
      nav("/notes");
    }
  }, [auth, nav]);

  const handleLogin = () => {
    if (!email.trim()) {
      alert("Please enter your email.");
      return;
    }
    if (!password.trim()) {
      alert("Please enter your password.");
      return;
    } else {
      dispatch(getUser({ email, password }));
    }
  };

  return (
    <div>
      <NavBar />
      <div className="form_container">
        <form>
          <h1>LogIn to your Account</h1>
          <hr />
          <div className="container">
            <label htmlFor="uname">
              <b>Email</b>
            </label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="text"
              placeholder="Enter your Email"
              name="uname"
              required
            />

            <label htmlFor="psw">
              <b>Password</b>
            </label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Enter your Password"
              name="password"
              required
            />

            <button type="button" onClick={handleLogin}>
            {loading ? "Logging..." : "Login"}
            </button>
            <label>
              <input type="checkbox" defaultChecked name="remember" /> Remember
              me
            </label>
          </div>
        </form>
      </div>
    </div>
  );
}
