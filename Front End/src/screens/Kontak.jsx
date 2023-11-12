import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

import imgArrowRight from "./../assets/image/arrow-right2.svg";
import { Link } from "react-router-dom";
import InputGlobal from "../components/input/InputGlobal";

import imgInstagram from "./../assets/image/Instagram2.svg";
import imgSubstrak from "./../assets/image/Subtract.svg";
import imgTwitter from "./../assets/image/Twitter2.svg";
import imgLocation from "./../assets/image/location.svg";

import AOS from "aos";

const Kontak = () => {
  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  return (
    <>
      <div className="kontak ">
        <div className="container">
          <div className="navigasi-top">
            <Link className="link" to="/">
              Asrah Mode <img src={imgArrowRight} alt="" />
            </Link>
            <div className="text">Belanja</div>
          </div>

          <div className="tittle-page" data-aos="fade-up" data-aos-delay="300">
            Kontak Kami
          </div>
          <div
            className="child-tittle-page"
            data-aos="fade-up"
            data-aos-delay="500"
          >
            Lorem ipsum dolor sit amet consectetur. Adipiscing dignissim
            consectetur sed ultricies vel id ut.
          </div>

          <div className="row">
            <div className="col-md-6">
              <div class="iframe-container" data-aos="zoom-in">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7298.069214875703!2d4.280931902482523!3d52.066601234056094!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47c5b1292de06a1d%3A0x6bc9ffb06366a9d2!2sSarah%20Mode!5e0!3m2!1sen!2sid!4v1699606596212!5m2!1sen!2sid"
                  allowfullscreen=""
                  loading="lazy"
                  referrerpolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>

              <div className="tittle-kontak">CV.ASRAHMODE</div>
              <hr />
              <div className="d-flex align-items-start pb-3">
                <img src={imgLocation} alt="" />
                <div className="text ps-2">
                  JL. Gerilya, Proklamasi 5A, Blok. D, RT. 105 No.45, Kel.
                  Sungai Pinang Dalam, Kec. Sungai Pinang, Samarinda, Kalimantan
                  Timur
                </div>
              </div>
              <div className="d-flex align-items-start pb-3">
                <img src={imgInstagram} alt="" />
                <div className="text ps-2">@username</div>
              </div>
              <div className="d-flex align-items-start pb-3">
                <img src={imgTwitter} alt="" />
                <div className="text ps-2">082112345678</div>
              </div>
              <div className="d-flex align-items-start pb-3">
                <img src={imgSubstrak} alt="" />
                <div className="text ps-2">admin@asrahmode.com</div>
              </div>
            </div>
            <div className="col-md-6">
              <InputGlobal
                register={register}
                errors={errors}
                name="nim"
                type_input="text"
                placeholder="Masukkan nim..."
              />
              <InputGlobal
                register={register}
                errors={errors}
                name="nim"
                type_input="text"
                placeholder="Masukkan nim..."
              />
              <InputGlobal
                register={register}
                errors={errors}
                name="nim"
                type_input="text"
                placeholder="Masukkan nim..."
              />
              <InputGlobal
                register={register}
                errors={errors}
                name="nim"
                type_input="area"
                placeholder="Masukkan nim..."
              />

              <button className="btnDark_long">Kirim</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Kontak;
