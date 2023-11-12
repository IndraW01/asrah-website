import React, { useState, useEffect } from "react";
import Navbar from "../components/layout/Navbar";

import { Link } from "react-router-dom";

import imgArrowRight from "./../assets/image/arrow-right2.svg";
import imgBaju from "./../assets/image/baju.svg";
import imgTrash from "./../assets/image/trash.svg";
import imgArroBottom from "./../assets/image/arrow-right.svg";
import imgClose from "./../assets/image/close-circle.svg";
import imgMinus from "./../assets/image/minus.svg";
import imgAdd from "./../assets/image/add.svg";
import Footer from "../components/layout/Footer";

import { Carousel } from "react-responsive-carousel";

import AOS from "aos";

const DetailProduk = () => {
  const [selectedBox, setSelectedBox] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [modal, setModal] = useState(false);

  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);

  const Ukuran = [
    { id: 1, ukuran: "S" },
    { id: 2, ukuran: "M" },
    { id: 3, ukuran: "L" },
    { id: 4, ukuran: "XL" },
  ];
  const Warna = [
    { id: 1, warna: "red" },
    { id: 2, warna: "green" },
    { id: 3, warna: "blue" },
  ];

  useEffect(() => {
    const magnifyingArea = document.getElementById("magnifying_area");
    const magnifyingImg = document.getElementById("magnifying_img");

    const handleMouseMove = (event) => {
      const { clientX, clientY } = event;
      const { offsetLeft, offsetTop, offsetWidth, offsetHeight } =
        magnifyingArea;

      const percentageX = ((clientX - offsetLeft) / offsetWidth) * 100;
      const percentageY = ((clientY - offsetTop) / offsetHeight) * 100;

      magnifyingImg.style.transform = `translate(-${percentageX}%, -${percentageY}%) scale(2)`;
    };

    const handleMouseLeave = () => {
      magnifyingImg.style.transform = "translate(-50%, -50%) scale(1)";
    };

    magnifyingArea.addEventListener("mousemove", handleMouseMove);
    magnifyingArea.addEventListener("mouseleave", handleMouseLeave);

    // Cleanup event listeners on component unmount
    return () => {
      magnifyingArea.removeEventListener("mousemove", handleMouseMove);
      magnifyingArea.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <>
      <div className="produk">
        <div className="container">
          <div className="navigasi-top">
            <Link className="link" to="/">
              Asrah Mode <img src={imgArrowRight} alt="" />
            </Link>
            <Link className="link" to="/produk">
              Belanja <img src={imgArrowRight} alt="" />
            </Link>
            <div className="text">Kebaya Samarinda</div>
          </div>

          <div className="row container-vertical-carousel">
            <div className="col-md-5 left">
              <div className="d-flex w-100">
                <Carousel
                  className="vertical-carousel"
                  autoPlay={true}
                  showArrows={true}
                  showIndicators={false}
                  showStatus={false}
                  showThumbs={false}
                  infiniteLoop={true}
                  axis="vertical"
                  renderArrowPrev={(clickHandler, hasPrev) => {
                    return (
                      <div
                        className="preview_vertical_arrow_up"
                        onClick={clickHandler}
                      >
                        <img src={imgArroBottom} alt="" />
                      </div>
                    );
                  }}
                  renderArrowNext={(clickHandler, hasNext) => {
                    return (
                      <div
                        className="preview_vertical_arrow"
                        onClick={clickHandler}
                      >
                        <img src={imgArroBottom} alt="" />
                      </div>
                    );
                  }}
                >
                  <img
                    className="preview_child_carousel"
                    src={imgBaju}
                    alt=""
                  />
                  <img
                    className="preview_child_carousel"
                    src={imgBaju}
                    alt=""
                  />
                  <img
                    className="preview_child_carousel"
                    src={imgBaju}
                    alt=""
                  />
                </Carousel>

                <figure className="preview" id="magnifying_area">
                  <img id="magnifying_img" src={imgBaju} alt="" />
                </figure>
              </div>
            </div>
            <div className="col-md-7">
              <div className="d-md-flex align-items-center justify-content-between">
                <div className="nama_baju">Kebaya Samarinda</div>
                <div className="harga">Rp 265.000</div>
              </div>
              <div className="jenis">Pakaian Pria</div>
              <div className="text_ukuran">
                Lorem ipsum dolor sit amet consectetur. Adipiscing dignissim
                consectetur sed ultricies vel id ut. Adipiscing integer
                elementum habitant vit
              </div>
              <div className="pilih_ukuran">Pilih Ukuran</div>
              <div className="container_choose_ukuran d-flex gap-2">
                {Ukuran.map((box) => (
                  <div
                    key={box.id}
                    className={`ukuran_box ${
                      selectedBox === box.id ? "selected" : ""
                    }`}
                    style={{ backgroundColor: box.color }}
                    onClick={() => setSelectedBox(box.id)}
                  >
                    {box.ukuran}
                  </div>
                ))}
              </div>
              <div className="pilih_ukuran">Pilih Warna</div>

              <div className="container_choose_ukuran warna d-flex gap-2">
                {Warna.map((box) => (
                  <div
                    key={box.id}
                    className={`color-box ${
                      selectedColor === box.id ? "selected" : ""
                    }`}
                    style={
                      selectedColor === box.id
                        ? { border: `1px solid ${box.warna} ` }
                        : { border: `1px solid #D3D3D4 ` }
                    }
                    onClick={() => setSelectedColor(box.id)}
                  >
                    <div
                      className="color_inti"
                      style={{ background: box.warna }}
                    ></div>
                  </div>
                ))}
              </div>

              <button className="btnDark_long" onClick={() => setModal(true)}>
                Tambah ke keranjang
              </button>
            </div>
          </div>

          <div className="tittle-page">Produk Lainnya</div>

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
              <Link className="card-product-one small" to="/produk/123">
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

        {/* sidebar */}
      </div>

      {modal ? (
        <div className="container_full-black">
          <div className="sidebar_detail_produk" data-aos="fade-left">
            <div className=" navv d-flex align-items-center justify-content-between">
              <div className="left">Keranjang</div>
              <div className="right">
                <img src={imgClose} onClick={() => setModal(false)} alt="" />
              </div>
            </div>

            <div className="container_content">
              <div className="item_list list_side d-flex align-items-center justify-content-between">
                <div className="left">
                  <div className=" d-flex align-items-center ">
                    <img className="image_bg" src={imgBaju} alt="" />
                    <div className="detail">
                      <div className="nama">Kebaya Samarinda</div>
                      <div className="ukuran">Ukuran: XL, Warna: Hitam</div>
                      <div className="harga">Rp 265.000</div>

                      <div className="d-flex align-items-center  gap-3">
                        <div className="btn_tambah_kurang">
                          <img src={imgMinus} alt="" />
                        </div>
                        <div className="angka">1</div>
                        <div className="btn_tambah_kurang">
                          <img src={imgAdd} alt="" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="right">
                  <img src={imgTrash} alt="" />
                </div>
              </div>
              <div className="item_list list_side d-flex align-items-center justify-content-between">
                <div className="left">
                  <div className=" d-flex align-items-center ">
                    <img className="image_bg" src={imgBaju} alt="" />
                    <div className="detail">
                      <div className="nama">Kebaya Samarinda</div>
                      <div className="ukuran">Ukuran: XL, Warna: Hitam</div>
                      <div className="harga">Rp 265.000</div>

                      <div className="d-flex align-items-center  gap-3">
                        <div className="btn_tambah_kurang">
                          <img src={imgMinus} alt="" />
                        </div>
                        <div className="angka">1</div>
                        <div className="btn_tambah_kurang">
                          <img src={imgAdd} alt="" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="right">
                  <img src={imgTrash} alt="" />
                </div>
              </div>
              <div className="item_list list_side d-flex align-items-center justify-content-between">
                <div className="left">
                  <div className=" d-flex align-items-center ">
                    <img className="image_bg" src={imgBaju} alt="" />
                    <div className="detail">
                      <div className="nama">Kebaya Samarinda</div>
                      <div className="ukuran">Ukuran: XL, Warna: Hitam</div>
                      <div className="harga">Rp 265.000</div>

                      <div className="d-flex align-items-center  gap-3">
                        <div className="btn_tambah_kurang">
                          <img src={imgMinus} alt="" />
                        </div>
                        <div className="angka">1</div>
                        <div className="btn_tambah_kurang">
                          <img src={imgAdd} alt="" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="right">
                  <img src={imgTrash} alt="" />
                </div>
              </div>
              <div className="item_list list_side d-flex align-items-center justify-content-between">
                <div className="left">
                  <div className=" d-flex align-items-center ">
                    <img className="image_bg" src={imgBaju} alt="" />
                    <div className="detail">
                      <div className="nama">Kebaya Samarinda</div>
                      <div className="ukuran">Ukuran: XL, Warna: Hitam</div>
                      <div className="harga">Rp 265.000</div>

                      <div className="d-flex align-items-center  gap-3">
                        <div className="btn_tambah_kurang">
                          <img src={imgMinus} alt="" />
                        </div>
                        <div className="angka">1</div>
                        <div className="btn_tambah_kurang">
                          <img src={imgAdd} alt="" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="right">
                  <img src={imgTrash} alt="" />
                </div>
              </div>
              <div className="item_list list_side d-flex align-items-center justify-content-between">
                <div className="left">
                  <div className=" d-flex align-items-center ">
                    <img className="image_bg" src={imgBaju} alt="" />
                    <div className="detail">
                      <div className="nama">Kebaya Samarinda</div>
                      <div className="ukuran">Ukuran: XL, Warna: Hitam</div>
                      <div className="harga">Rp 265.000</div>

                      <div className="d-flex align-items-center  gap-3">
                        <div className="btn_tambah_kurang">
                          <img src={imgMinus} alt="" />
                        </div>
                        <div className="angka">1</div>
                        <div className="btn_tambah_kurang">
                          <img src={imgAdd} alt="" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="right">
                  <img src={imgTrash} alt="" />
                </div>
              </div>
              <div className="item_list list_side d-flex align-items-center justify-content-between">
                <div className="left">
                  <div className=" d-flex align-items-center ">
                    <img className="image_bg" src={imgBaju} alt="" />
                    <div className="detail">
                      <div className="nama">Kebaya Samarinda</div>
                      <div className="ukuran">Ukuran: XL, Warna: Hitam</div>
                      <div className="harga">Rp 265.000</div>

                      <div className="d-flex align-items-center  gap-3">
                        <div className="btn_tambah_kurang">
                          <img src={imgMinus} alt="" />
                        </div>
                        <div className="angka">1</div>
                        <div className="btn_tambah_kurang">
                          <img src={imgAdd} alt="" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="right">
                  <img src={imgTrash} alt="" />
                </div>
              </div>
              <div className="item_list list_side d-flex align-items-center justify-content-between">
                <div className="left">
                  <div className=" d-flex align-items-center ">
                    <img className="image_bg" src={imgBaju} alt="" />
                    <div className="detail">
                      <div className="nama">Kebaya Samarinda</div>
                      <div className="ukuran">Ukuran: XL, Warna: Hitam</div>
                      <div className="harga">Rp 265.000</div>

                      <div className="d-flex align-items-center  gap-3">
                        <div className="btn_tambah_kurang">
                          <img src={imgMinus} alt="" />
                        </div>
                        <div className="angka">1</div>
                        <div className="btn_tambah_kurang">
                          <img src={imgAdd} alt="" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="right">
                  <img src={imgTrash} alt="" />
                </div>
              </div>
              <div className="item_list list_side d-flex align-items-center justify-content-between">
                <div className="left">
                  <div className=" d-flex align-items-center ">
                    <img className="image_bg" src={imgBaju} alt="" />
                    <div className="detail">
                      <div className="nama">Kebaya Samarinda</div>
                      <div className="ukuran">Ukuran: XL, Warna: Hitam</div>
                      <div className="harga">Rp 265.000</div>

                      <div className="d-flex align-items-center  gap-3">
                        <div className="btn_tambah_kurang">
                          <img src={imgMinus} alt="" />
                        </div>
                        <div className="angka">1</div>
                        <div className="btn_tambah_kurang">
                          <img src={imgAdd} alt="" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="right">
                  <img src={imgTrash} alt="" />
                </div>
              </div>
            </div>

            <div className="container_submit">
              <div className="d-flex justify-content-between bawah">
                <div className="total">Total harga (1 item)</div>
                <div className="harga_total"> Rp 265.000</div>
              </div>

              <button className="btnDark_long">Checkout</button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default DetailProduk;
