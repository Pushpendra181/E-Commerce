import React, { useContext, useEffect, useState } from "react";
import "./Nav.css";
import { AuthContext } from "../../context/AuthContext";
import { NavLink } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";
import axios from "axios";

const Nav = ({ cart, setCart }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { logout } = useContext(AuthContext);

  useEffect(() => {
    const storedItems = localStorage.getItem("cart");
    if (storedItems) {
      setCart(JSON.parse(storedItems));
    }
  }, [setCart]);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const logOut = async () => {
    try {
      const response = await axios.post("http://localhost:5000/user/logout");
      logout();
      localStorage.removeItem("token");
      window.location.href = "/login";
      setIsAuthenticated(false);
      alert(response.data.msg);
    } catch (err) {
      console.log(err);
      alert("Logout failed. Please try again.");
    }
  };

  return (
    <div className="Nav">
      <ul>
        <li>
          <NavLink to="/home" className="list-item">
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/profile" className="list-item">
            My Profile
          </NavLink>
        </li>
        <li>
          <NavLink to="/addpost" className="list-item logIn_Out">
            Add Post
          </NavLink>
        </li>

        {isAuthenticated ? (
          <li>
            <button className="logIn_Out" onClick={logOut}>
              Log Out
            </button>
          </li>
        ) : (
          <li>
            <NavLink to="/" className="list-item logIn_Out">
              Log In
            </NavLink>
          </li>
        )}
        <li>
          <NavLink to="/addtocart" className="cart">
            <i className="fas fa-shopping-cart"></i>cart
            {cart.length > 0 && <span className="span">{cart.length}</span>}
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Nav;
