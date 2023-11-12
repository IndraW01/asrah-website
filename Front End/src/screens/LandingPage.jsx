import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Carousel from "react-multi-carousel";
import AOS from "aos";

import imgSection1 from "./../assets/image/homePage_1.svg";
import imgArrowRight from "./../assets/image/arrow-right.svg";
import imgBaju from "./../assets/image/baju.svg";
import imgArroBottom from "./../assets/image/arrow-right.svg";

import "./../assets/style/style_layouts/user.css";
import { responsive } from "../assets/style/style_carousel/responsive";
import "react-multi-carousel/lib/styles.css";
import "aos/dist/aos.css";

const LandingPage = () => {
  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);

  const ButtonGroup = ({ next, previous, goToSlide, ...rest }) => {
    const {
      carouselState: { currentSlide },
    } = rest;
    return (
      <div className="arrow_carousel_horizontal">
        <div className="container">
          <div className="left" onClick={() => previous()}>
            <img src={imgArroBottom} alt="" />
          </div>
          <div onClick={() => next()}>
            <span className="right">
              <img src={imgArroBottom} alt="" />
            </span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <div className="landingPage">
        <section className="one">
          <div className="container">
            <div className="row d-flex align-items-center">
              <div className="col-md-6 ">
                <div className="tittle" data-aos="fade-up" data-aos-delay="200">
                  Fashion Mode Budaya Lokal Indonesia
                </div>
                <div
                  className="child-tittle"
                  data-aos="fade-up"
                  data-aos-delay="500"
                >
                  Mari jelajahi dunia mode Indonesia yang mempesona. Setiap
                  kain, motif, dan desain berasal dari akar budaya yang kaya.
                  Temukan pilihan pakaian yang sesuai dengan keinginan Anda.
                </div>

                <div
                  className="d-flex align-content-center gap-3 "
                  data-aos="fade-up"
                  data-aos-delay="700"
                >
                  <Link className="btnDark" to="/produk">
                    Belanja Sekarang
                  </Link>
                  <Link className="btnWhite" to="/tentang kami">
                    tentang Kami
                  </Link>
                </div>
              </div>

              <div className="col-md-6">
                <img className="w-100 " src={imgSection1} alt="" />
              </div>
            </div>
          </div>
        </section>

        <section className="two">
          <div className="container d-flex justify-content-center">
            <div className="container-inner ">
              <div className="tittle" data-aos="fade-up" data-aos-delay="300">
                Apa yang Kami Lakukan?
              </div>
              <div
                className="child-tittle"
                data-aos="fade-up"
                data-aos-delay="500"
              >
                Lorem ipsum dolor sit amet consectetur. Augue tortor fusce purus
                dis non vitae. Scelerisque rutrum et hendrerit urna nam pulvinar
                tellus consectetur. Iaculis at vivamus aliquet faucibus non
                pulvinar. Et scelerisque pellentesque ornare malesuada ultricies
                in nisi. Vestibulum nunc ullamcorper commodo ultricies pulvinar
                aliquam morbi lectus amet. Vel nisi nec integer non nam egestas
                mollis magna faucibus.
              </div>
              <button className="btnDark">Tentang Kami</button>
            </div>
          </div>
        </section>

        <section className="tree">
          <div className="container" data-aos="fade-up" data-aos-delay="300">
            <div className="text-center tittle">Produk Kami</div>

            <div className="carouselll d-flex child-tittle align-content-center justify-content-center">
              <div className="text ">Lihat lebih banyak</div>
              <img src={imgArrowRight} alt="" />
            </div>

            <Carousel
              arrows={false}
              renderButtonGroupOutside={true}
              customButtonGroup={<ButtonGroup />}
              responsive={responsive}
            >
              <div className="card-product-one">
                <div className="container_image">
                  <img src={imgBaju} alt="" />
                </div>

                <div className="card-tittle">Kebaya</div>
                <div className="card-kelamin">Laki Laki</div>
                <div className="card-harga">Rp. 35.000</div>
              </div>
              <div className="card-product-one">
                <div className="container_image">
                  <img src={imgBaju} alt="" />
                </div>

                <div className="card-tittle">Kebaya</div>
                <div className="card-kelamin">Laki Laki</div>
                <div className="card-harga">Rp. 35.000</div>
              </div>
              <div className="card-product-one">
                <div className="container_image">
                  <img src={imgBaju} alt="" />
                </div>

                <div className="card-tittle">Kebaya</div>
                <div className="card-kelamin">Laki Laki</div>
                <div className="card-harga">Rp. 35.000</div>
              </div>
              <div className="card-product-one">
                <div className="container_image">
                  <img src={imgBaju} alt="" />
                </div>

                <div className="card-tittle">Kebaya</div>
                <div className="card-kelamin">Laki Laki</div>
                <div className="card-harga">Rp. 35.000</div>
              </div>
            </Carousel>
          </div>
        </section>
      </div>
    </>
  );
};

export default LandingPage;
