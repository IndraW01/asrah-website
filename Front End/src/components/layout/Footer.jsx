import React from "react";

import "./../../assets/style/style_component/footer.css";

import imgTwitter from "./../../assets/image/Twitter.svg";
import imgInstagram from "./../../assets/image/Instagram.svg";
import imgLogo from "./../../assets/image/logo.svg";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <>
      <footer className="global_footer">
        <div className="container">
          <div className="flex_global_footer">
            <div className=" d-flex align-items-center">
              <img src={imgLogo} alt="" />
              <div className="textLogo ps-3 text-white">Asrah Mode</div>
            </div>

            <div className="menu text-center">
              <Link className="menu_list" to="/">
                Home
              </Link>
              <Link className="menu_list" to="/produk">
                Belanja
              </Link>
              <Link className="menu_list" to="/tentang kami">
                Tentang Kami
              </Link>
              <Link className="menu_list" to="/kontak kami">
                Kontak
              </Link>
            </div>

            <div className=" d-flex align-items-center gap-3">
              <img src={imgInstagram} alt="" />
              <img src={imgTwitter} alt="" />
            </div>
          </div>
        </div>
      </footer>
      <footer className="global_footer2">
        <div className="container">
          <div className="d-flex align-items-center justify-content-between">
            <div className="text-white text-center">
              Designed & Developed by Borneo Tech Works
            </div>
            <div className="text-white text-center">
              © Asrah Mode. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
