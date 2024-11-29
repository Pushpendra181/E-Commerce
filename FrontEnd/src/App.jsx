import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/header/Header";
import Home from "./components/home/Home";
import Profile from "./components/profile/Profile";
import SignIn from "./components/singIn/SingIn";
import Login from "./components/login/Login";
import AddPost from "./components/addPost/AddPost";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./utils/ProtectedRoute";
import Update from "./components/update/Update";
import AddToCart from "./components/aadtocard/AddToCard";

const App = () => {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // Save cart to localStorage whenever it updates
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  return (
    <AuthProvider>
      <Router>
        <Header cart={cart} setCart={setCart} />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <Home cart={cart} setCart={setCart} />
              </ProtectedRoute>
            }
          />
          <Route path="/profile" element={<Profile />} />
          <Route path="/singin" element={<SignIn />} />
          <Route path="/addpost" element={<AddPost />} />
          <Route path="/update/:id" element={<Update />} />
          <Route path="/addtocart" element={<AddToCart cart={cart} setCart={setCart} />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
