import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation } from "react-router-dom";

import logoUnmul from "./../../assets/image/logo.svg";
import search from "./../../assets/image/search-normal.svg";
import shopping from "./../../assets/image/shopping-cart.svg";
import user from "./../../assets/image/user.svg";

import "./../../assets/style/style_component/navbar.css";

const Navbar = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [isOpen1, setIsOpen1] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };
  const handleToggle1 = () => {
    setIsOpen1(!isOpen1);
  };

  return (
    <nav className="global_navbar">
      <div className="container">
        <div className="d-flex align-items-center justify-content-between">
          <div className=" d-flex align-items-center">
            <img src={logoUnmul} alt="" />
            <div className="textLogo ps-3">Asrah Mode</div>
          </div>
          <div className={isOpen ? "menu open" : "menu"}>
            <Link className="menu_list" to="/">
              Home
            </Link>
            <Link className="menu_list" to="/produk">
              Belanja
            </Link>
            <Link className="menu_list" to="/tentang kami">
              Tentang Kami
            </Link>
            <Link className="menu_list" to="/kontak">
              Kontak
            </Link>
          </div>
          <div className=" d-flex align-items-center">
            <div className="icon" onClick={handleToggle1}>
              <img src={search} alt="" />
            </div>

            <div className="icon gap-2 d-flex align-items-center">
              <img src={shopping} alt="" />
              Chart (0)
            </div>
            <div className="icon">
              <img src={user} alt="" />
            </div>
            <div className="icon">
              <div
                className={isOpen ? "icon open" : ""}
                id="nav-icon3"
                onClick={handleToggle}
              >
                <span></span>
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          </div>

          <div
            className={
              isOpen1 ? "container_search_nav open" : "container_search_nav "
            }
          >
            <input className="search_input" type="text" />
            <div className="icon">
              <div className="icon2" onClick={handleToggle1}>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
