import React, { useState } from "react";
import axios from "axios";
import "./SingIn.css";
import { NavLink } from "react-router-dom";

const SignIn = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSignIn = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:5000/user/singin", {
        username,
        email,
        password,
      });

      console.log("SignUp successfully.");

      window.location.href = "/";
    } catch (error) {
      setErrorMessage("Invalid credentials");
    }
  };

  return (
    <div className="singIn login-container">
      <h2>Sign In</h2>
      <form onSubmit={handleSignIn}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Sign In</button>
      </form>
      <NavLink to="/login" className="list-item logIn_Out singUp">
        Log In
      </NavLink>
      {errorMessage && <p>{errorMessage}</p>}
    </div>
  );
};

export default SignIn;
