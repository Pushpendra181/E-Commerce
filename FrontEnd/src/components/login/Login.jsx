// Login.js

import React, { useState, useContext } from "react";
import axios from "axios";
// import { AuthContext } from "../../contexts/AuthContext";
import "./Login.css";
import { AuthContext } from "../../context/AuthContext";
import { Navigate, NavLink } from "react-router-dom";

const Login = () => {
  const { logIn } = useContext(AuthContext);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post(
        "http://localhost:5000/user/login",
        form
      
      );
      const data = response.data;

      logIn(data.token); // Use logIn from context
      alert("Login successful");
      window.location.href = "/home";
      // <Navigate to="/" />;
    } catch (err) {
      setError("Login failed. Please check your credentials and try again.");
      console.error("Login error:", err);
    }
  };

  return (
    <div className="login-container">
      <h4>Login</h4>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            onChange={handleChange}
            value={form.email}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            onChange={handleChange}
            value={form.password}
            required
          />
        </div>
        {error && <p className="error-message">{error}</p>}
        <button type="submit">Login</button>
      </form>
      <NavLink to="/singin" className="list-item logIn_Out singUp">
        Sign In
      </NavLink>
    </div>
  );
};

export default Login;
