import React from "react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

import imgBaju from "./../assets/image/baju.svg";

import { useForm } from "react-hook-form";

import imgArrowRight from "./../assets/image/arrow-right2.svg";
import { Link } from "react-router-dom";
import InputGlobal from "../components/input/InputGlobal";

const Checkout = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <>
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
            <div className="container_content_input col-md-7">
              {/* one two */}
              <div className="container_inputtt">
                <div className="tittle_input">Informasi Pribadi</div>

                <InputGlobal
                  register={register}
                  errors={errors}
                  name="nim"
                  type_input="text"
                  placeholder="Masukkan nim..."
                />

                <div className="row">
                  <div className="col-md-6">
                    <InputGlobal
                      register={register}
                      errors={errors}
                      name="nim"
                      type_input="text"
                      placeholder="Masukkan nim..."
                    />
                  </div>
                  <div className="col-md-6">
                    <InputGlobal
                      register={register}
                      errors={errors}
                      name="nim"
                      type_input="text"
                      placeholder="Masukkan nim..."
                    />
                  </div>
                </div>
              </div>

              {/* one */}
              <div className="container_inputtt">
                <div className="tittle_input">Alamat Pengiriman</div>

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

                <div className="row">
                  <div className="col-md-6">
                    <InputGlobal
                      register={register}
                      errors={errors}
                      name="nim"
                      type_input="text"
                      placeholder="Masukkan nim..."
                    />
                  </div>
                  <div className="col-md-6">
                    <InputGlobal
                      register={register}
                      errors={errors}
                      name="nim"
                      type_input="text"
                      placeholder="Masukkan nim..."
                    />
                  </div>
                </div>

                <InputGlobal
                  register={register}
                  errors={errors}
                  name="nim"
                  type_input="text"
                  placeholder="Masukkan nim..."
                />

                <button className="btnDark_long">Simpan</button>
              </div>

              {/* two */}
              <div className="container_inputtt">
                <div className="tittle_input">Alamat Pengiriman</div>

                <div className="container_alamat d-flex align-items-center justify-content-between">
                  <div className="left">
                    <div className="home">Rumah</div>
                    <div className="location">
                      Jalan ABC, No. 12, Kec. Samarinda Ulu, Kel. Gunung Keluar,
                      Samarinda, Kalimantan Timur
                    </div>
                  </div>

                  <div className="right">
                    <input type="radio" />
                  </div>
                </div>
                <div className="container_alamat d-flex align-items-center justify-content-between">
                  <div className="left">
                    <div className="home">Rumah</div>
                    <div className="location">
                      Jalan ABC, No. 12, Kec. Samarinda Ulu, Kel. Gunung Keluar,
                      Samarinda, Kalimantan Timur
                    </div>
                  </div>

                  <div className="right">
                    <input type="radio" />
                  </div>
                </div>

                <div className="btn_tambah_alamat d-flex align-items-center justify-content-center">
                  + Tambah alamat baru
                </div>

                <button className="btnDark_long">Simpan</button>
              </div>

              <div className="container_inputtt">
                <div className="tittle_input">Alamat Pengiriman</div>

                <div className="container_alamat d-flex align-items-center justify-content-between">
                  <div className="left">
                    <div className="home"> Nama Penerima</div>
                    <div className="location">Ananda Faris</div>
                  </div>
                </div>
                <div className="container_alamat d-flex align-items-center justify-content-between">
                  <div className="left">
                    <div className="home">Alamat</div>
                    <div className="location2">Rumah</div>
                    <div className="location">
                      Jalan ABC, No. 12, Kec. Samarinda Ulu, Kel. Gunung Keluar,
                      Samarinda, Kalimantan Timur
                    </div>
                  </div>
                </div>
              </div>

              <div className="container_inputtt">
                <div className="tittle_input">Pengiriman</div>

                <div className="container_alamat d-flex align-items-center justify-content-between">
                  <div className="left">
                    <div className="home"> Reguler (Rp 65.000)</div>
                    <div className="location">2-3 Hari</div>
                  </div>

                  <div className="right">
                    <input type="radio" />
                  </div>
                </div>
                <div className="container_alamat d-flex align-items-center justify-content-between">
                  <div className="left">
                    <div className="home"> RHemat (Rp 25.000)</div>
                    <div className="location">5-10 Hari</div>
                  </div>

                  <div className="right">
                    <input type="radio" />
                  </div>
                </div>
              </div>

              <div className="container_inputtt">
                <button className="btnDark_long">Simpan</button>
              </div>
            </div>
            <div className="col-md-5 container_detail">
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
          </div>
        </div>
      </div>
    </>
  );
};

export default Checkout;
