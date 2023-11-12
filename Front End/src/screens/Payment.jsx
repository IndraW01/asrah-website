import React from "react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

import imgBaju from "./../assets/image/baju.svg";

import { useForm } from "react-hook-form";

import imgArrowRight from "./../assets/image/arrow-right2.svg";
import imgInfo from "./../assets/image/info-circle.svg";
import imgBni from "./../assets/image/bni.svg";
import imgDana from "./../assets/image/dana.svg";
import imgGopay from "./../assets/image/gopay.svg";
import imgOvo from "./../assets/image/ovo.svg";
import { Link } from "react-router-dom";
import InputGlobal from "../components/input/InputGlobal";

const Payment = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <>
      <Navbar />

      <div className="checkout">
        <div className="container">
          <div className="tittle-page">Checkout</div>
          <div className="child-tittle-page">
            <div className="d-flex justify-content-center">
              <div className="text_navigasi_checkout">
                Pembayaran <img src={imgArrowRight} alt="" />
              </div>
              <div className="text">
                Pembayaran <img src={imgArrowRight} alt="" />
              </div>
              <div className="text">Pembayaran</div>
            </div>
          </div>

          <div className="content row">
            <div className="container_content_input payment col-md-5">
              <div className="tittle_input">Informasi Pesanan</div>
              <div className="container_detail_checkout d-flex align-items-center justify-content-between">
                <div className=" d-flex align-items-center ">
                  <img className="image_bg" src={imgBaju} alt="" />
                  <div className="detail">
                    <div className="nama">Kebaya Samarinda</div>
                    <div className="ukuran">Ukuran: XL, Warna: Hitam</div>
                    <div className="jumlah">Jumlah: 1</div>
                  </div>
                </div>

                <div className="harga">Rp 265.000</div>
              </div>

              <div className="container_bottom_price">
                <div className=" d-flex align-items-center justify-content-between ">
                  <div className="left">Harga item (1 item)</div>
                  <div className="right">Rp 265.000</div>
                </div>
                <div className=" d-flex align-items-center justify-content-between pt-3 ">
                  <div className="left">Ongkos kirim</div>
                  <div className="right2">dihitung pada tahap berikutnya</div>
                </div>
              </div>
              <div className="container_bottom_price2">
                <div className=" d-flex align-items-center justify-content-between ">
                  <div className="left">Total Harga</div>
                  <div className="right">Rp 265.000</div>
                </div>
              </div>
            </div>
            <div className="col-md-7 container_detail payment">
              <div className="tittle_input">Informasi Pembayaran</div>

              <div className="alert_payment">
                <div className="d-flex gap-2 align-items-start">
                  <img src={imgInfo} alt="" />
                  <div className="text">
                    Silahkan transfer sesuai dengan total harga yang tertera di
                    atas, kemudian upload bukti pembayarannya dalam waktu 1x24
                    jam. Admin akan melakukan verifikasi setelah bukti
                    pembayaran diupload
                  </div>
                </div>
              </div>

              <div className="container_bank">
                <div className="title">Rekening</div>
                <div className="list d-flex align-items-center  ">
                  <div className="left">
                    <img src={imgBni} alt="" />
                  </div>
                  <div className="right">
                    BNI : 1349522707 (a.n. Maya Simorangkir)
                  </div>
                </div>
                <div className="list d-flex align-items-center  ">
                  <div className="left">
                    <img src={imgGopay} alt="" />
                  </div>
                  <div className="right">
                    GoPay : 089506133714 (a.n. Grace Panjaitan)
                  </div>
                </div>
                <div className="list d-flex align-items-center  ">
                  <div className="left">
                    <img src={imgDana} alt="" />
                  </div>
                  <div className="right">
                    DANA : 089506133714 (a.n. Grace Agatha Panjaitan)
                  </div>
                </div>
                <div className="list d-flex align-items-center  ">
                  <div className="left">
                    <img src={imgOvo} alt="" />
                  </div>
                  <div className="right">
                    OVO : 089506133714 (a.n. Grace Panjaitan)
                  </div>
                </div>

                <div className="title">Upload bukti pembarayan</div>
                <InputGlobal
                  register={register}
                  errors={errors}
                  name="nim"
                  type_input="text"
                  placeholder="Masukkan nim..."
                />
                <div className="aturan">
                  Silahkan upload file dalam format .jpg, .png atau .pdf
                </div>

                <div className="continer_time">
                  Waktu Tersisa <span>23:59:59</span>
                </div>

                <button className="btnDark_long">Konfirmasi Pembayaran</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Payment;
