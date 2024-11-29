import React from "react";
import Nav from "../nav/Nav";
import { NavLink } from "react-router-dom";
import logo from "../../../public/images.png";
import "./Header.css"

const Header = ({ cart, setCart }) => {
  return (
    <div className="Header">
      <NavLink to="/home">
        <img src={logo} alt="" className="logo"/>
        {/* <img src={logo} alt="logo" className="logo" /> */}
      </NavLink>

      {/* -----------------Navbar------------- */}
      <Nav cart={cart} setCart={setCart} />
    </div>
  );
};

export default Header;
