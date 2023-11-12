import React, { useEffect } from "react";
import { Link } from "react-router-dom";

import imgArrowRight from "./../assets/image/arrow-right2.svg";
import imgAbout from "./../assets/image/about_1.svg";

import AOS from "aos";

const About = () => {
  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);

  return (
    <>
      <div className="about">
        <section className="one">
          <div className="container-content">
            <div className="tittle" data-aos="fade-up" data-aos-delay="300">
              Tentang Kami
            </div>
            <div
              className="child-tittle"
              data-aos="fade-up"
              data-aos-delay="500"
            >
              Lorem ipsum dolor sit amet consectetur. Et massa et potenti enim
              pharetra. Ante sed amet ultricies mollis. Volutpat ac sapien eget
              pharetra egestas sociis sed commodo. Nulla viverra consequat morbi
              etiam proin facilisis. Lorem proin imperdiet nunc adipiscing
              elementum ac. Ut vitae laoreet in massa lacus aliquam vel.
            </div>
          </div>
        </section>

        <section className="two">
          <div className="container">
            <div className="navigasi-top">
              <Link className="link" to="/">
                Asrah Mode <img src={imgArrowRight} alt="" />
              </Link>
              <div className="text">Belanja</div>
            </div>

            <div className="row">
              <div className="col-md-3">
                <div className="left-tittle">History of </div>
                <div className="left-tittle2">Asrah Mode </div>
              </div>
              <div className="col-md-9">
                <div className="text" data-aos="fade-up" data-aos-delay="300">
                  Brand Fashion dari Samarinda yang memiliki ciri khas unik
                  dalam segi desain busana yaitu dengan memakai metode-metode
                  fabric, salah satunya adalah Fabric Manipulation yang mana
                  teknik ini terus dikembangkan berdasarkan ide dan inovasi kami
                  pribadi yang dibuat dengan Handmade dipadukan payet/ anyaman/
                  bordir/ tie dye/ macrame. Kami mengusung tema “Sustainable
                  Fashion” serta mengangkat Kearifan Lokal Indonesia dalam
                  kategori Modest Wear.
                </div>
                <br />
                <div className="text" data-aos="fade-up" data-aos-delay="500">
                  Hal ini diprakarsai oleh Asrah Qonitah Husna sejak 2019. Usaha
                  “ Asrah Mode” kemudian dikembangkan menjadi “CV. Asrah Mode”
                  yang Launching pada tanggal 19 April 2022 (17 Ramadhan 1443
                  H). Kemudian terbentuknya persekutuan komenditer - CV
                  berkembang menjadi penyedia jasa yaitu Jasa Desain, Jasa Jahit
                  Jasa Make Up , dan Jasa Foto/Video yang tidak terlepas dari
                  industri Fashion, Seni dan Kreatif
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="tree">
          <div className="container">
            <div className="row">
              <div className="col-md-6">
                <div className="left-tittle">Our Vision</div>
                <div
                  className="left-text"
                  data-aos="fade-up"
                  data-aos-delay="300"
                >
                  “Asrah Mode” Menjadi Brand Fashion Kategori Modest Wear Yang
                  Berbasis Kearifan Lokal Dan Ramah Lingkungan.{" "}
                </div>

                <br />
                <br />
                <br />
                <div className="left-tittle">Our Mission</div>
                <div className="left-mission">
                  <div className="pb-3 d-flex align-items-center">
                    <div className="no">1</div>
                    <div className="text ps-3">
                      Mengangkat kearifan lokal Indonesia berupa kain
                      batik/tenun nusantara menjadi produk fashion yang
                      berkualitas
                    </div>
                  </div>
                  <div className="pb-3 d-flex align-items-center">
                    <div className="no">2</div>
                    <div className="text ps-3">
                      Mengembangkan eco-fashion / sustainability fashion yang
                      ramah terhadap lingkungan tanpa merusak lingkungan
                    </div>
                  </div>
                  <div className="pb-3 d-flex align-items-center">
                    <div className="no">3</div>
                    <div className="text ps-3">
                      Merubah pandangan masyarakat bahwa kain batik/tenun
                      nusantara yang terkesan kuno dan monoton menjadi busana
                      yang modern, trendy dan elegan
                    </div>
                  </div>
                  <div className="pb-3 d-flex align-items-center">
                    <div className="no">4</div>
                    <div className="text ps-3">
                      Menumbuhkan kecintaan terhadap produk-produk lokal
                      Indonesia dan upaya mengurangi konsumsi produk impor
                    </div>
                  </div>
                  <div className="pb-3 d-flex align-items-center">
                    <div className="no">5</div>
                    <div className="text ps-3">
                      Menjadikan Fashion sebagai pengabadian moment berupa
                      foto/video
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="w-100">
                  <img className="w-100" src={imgAbout} alt="" />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default About;
