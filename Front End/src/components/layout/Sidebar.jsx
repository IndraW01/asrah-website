import React from "react";
import { Link } from "react-router-dom";

import "./../../assets/style/style_component/sidebar.css";

import icnHome from "./../../assets/image/home.svg";
import icnKelas from "./../../assets/image/class.svg";
import icnKalender from "./../../assets/image/today.svg";
import icnProfile from "./../../assets/image/person.svg";
import icnExit from "./../../assets/image/exit_to_app.svg";

const Sidebar = () => {
  return (
    <div className="container-fluid">
      <div className="global_sidebar ">
        <div className="tittle_menu">Menu</div>

        <div className="wrap_container">
          <div className="top">
            <Link
              className="list d-flex align-items-center"
              to="/mahasiswa/home"
            >
              <img src={icnHome} alt="" />
              <div className="name">Home</div>
            </Link>
            <Link
              className="list d-flex align-items-center"
              to="/mahasiswa/kelas"
            >
              <img src={icnKelas} alt="" />
              <div className="name">Kelas</div>
            </Link>
            <Link
              className="list d-flex align-items-center"
              to="/mahasiswa/kalender"
            >
              <img src={icnKalender} alt="" />
              <div className="name">Kalender</div>
            </Link>
            <Link
              className="list d-flex align-items-center"
              to="/mahasiswa/profile"
            >
              <img src={icnProfile} alt="" />
              <div className="name">Profil</div>
            </Link>
          </div>

          <div className="bottom">
            <div className="list exit d-flex align-items-center">
              <img src={icnExit} alt="" />
              <div className="name">Keluar</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
