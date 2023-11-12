import React, { useEffect } from "react";
import Navbar from "../components/layout/Navbar";
import { Link } from "react-router-dom";

import imgArrowRight from "./../assets/image/arrow-right2.svg";
import imgBaju from "./../assets/image/baju.svg";
import Footer from "../components/layout/Footer";

import AOS from "aos";

const Produk = () => {
  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);
  return (
    <>
      <div className="produk">
        <div className="container">
          <div className="navigasi-top">
            <Link className="link" to="/">
              Asrah Mode <img src={imgArrowRight} alt="" />
            </Link>
            <div className="text">Belanja</div>
          </div>

          <div className="tittle-page" data-aos="fade-up" data-aos-delay="300">
            Koleksi Produk Kami
          </div>
          <div
            className="child-tittle-page"
            data-aos="fade-up"
            data-aos-delay="500"
          >
            Berikut merupakan koleksi produk terbaik kami
          </div>

          <div className="row">
            <div className="col-md-3 ">
              <div className="menu-produk">
                <div className="menu-list active">Semua (28)</div>
                <div className="menu-list">Semua (28)</div>
                <div className="menu-list">Semua (28)</div>
              </div>
            </div>

            <div className="col-md-9">
              <div className="container_list-produk">
                <div className="list-produk">
                  <Link className="card-product-one" to="/produk/123">
                    <div className="card-product-one">
                      <div className="container_image">
                        <img src={imgBaju} alt="" />
                      </div>

                      <div className="card-tittle">Kebaya</div>
                      <div className="card-kelamin">Laki Laki</div>
                      <div className="card-harga">Rp. 35.000</div>
                    </div>
                  </Link>
                  <Link className="card-product-one" to="/produk/123">
                    <div className="card-product-one">
                      <div className="container_image">
                        <img src={imgBaju} alt="" />
                      </div>

                      <div className="card-tittle">Kebaya</div>
                      <div className="card-kelamin">Laki Laki</div>
                      <div className="card-harga">Rp. 35.000</div>
                    </div>
                  </Link>
                  <Link className="card-product-one" to="/produk/123">
                    <div className="card-product-one">
                      <div className="container_image">
                        <img src={imgBaju} alt="" />
                      </div>

                      <div className="card-tittle">Kebaya</div>
                      <div className="card-kelamin">Laki Laki</div>
                      <div className="card-harga">Rp. 35.000</div>
                    </div>
                  </Link>
                  <Link className="card-product-one" to="/produk/123">
                    <div className="card-product-one">
                      <div className="container_image">
                        <img src={imgBaju} alt="" />
                      </div>

                      <div className="card-tittle">Kebaya</div>
                      <div className="card-kelamin">Laki Laki</div>
                      <div className="card-harga">Rp. 35.000</div>
                    </div>
                  </Link>
                  <Link className="card-product-one" to="/produk/123">
                    <div className="card-product-one">
                      <div className="container_image">
                        <img src={imgBaju} alt="" />
                      </div>

                      <div className="card-tittle">Kebaya</div>
                      <div className="card-kelamin">Laki Laki</div>
                      <div className="card-harga">Rp. 35.000</div>
                    </div>
                  </Link>
                  <Link className="card-product-one" to="/produk/123">
                    <div className="card-product-one">
                      <div className="container_image">
                        <img src={imgBaju} alt="" />
                      </div>

                      <div className="card-tittle">Kebaya</div>
                      <div className="card-kelamin">Laki Laki</div>
                      <div className="card-harga">Rp. 35.000</div>
                    </div>
                  </Link>
                  <Link className="card-product-one" to="/produk/123">
                    <div className="card-product-one">
                      <div className="container_image">
                        <img src={imgBaju} alt="" />
                      </div>

                      <div className="card-tittle">Kebaya</div>
                      <div className="card-kelamin">Laki Laki</div>
                      <div className="card-harga">Rp. 35.000</div>
                    </div>
                  </Link>
                  <Link className="card-product-one" to="/produk/123">
                    <div className="card-product-one">
                      <div className="container_image">
                        <img src={imgBaju} alt="" />
                      </div>

                      <div className="card-tittle">Kebaya</div>
                      <div className="card-kelamin">Laki Laki</div>
                      <div className="card-harga">Rp. 35.000</div>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Produk;
