import React, { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import LandingPage from "./screens/LandingPage";
import Produk from "./screens/Produk";
import Kontak from "./screens/Kontak";
import About from "./screens/About";
import Login from "./screens/Login";
import Registrasi from "./screens/Registrasi";
import DetailProduk from "./screens/DetailProduk";
import Checkout from "./screens/Checkout";
import Payment from "./screens/Payment";
import Beranda from "./layouts/beranda/Beranda";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/registrasi" element={<Registrasi />} />

          <Route path="/" element={<Beranda />}>
            <Route path="/" element={<LandingPage />} />
            <Route path="/produk" element={<Produk />} />
            <Route path="/tentang kami" element={<About />} />
            <Route path="/kontak" element={<Kontak />} />
            <Route path="/produk/:id" element={<DetailProduk />} />
            <Route path="/checkout/:id" element={<Checkout />} />
            <Route path="/pembayaran/:id" element={<Payment />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
