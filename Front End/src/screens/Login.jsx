import React from "react";

import { useForm } from "react-hook-form";

import { Link } from "react-router-dom";

import imgGoogle from "./../assets/image/google.svg";
import logo from "./../assets/image/logo.svg";
import InputGlobal from "../components/input/InputGlobal";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <div class="wrap_container_auth">
      <div class="backgound">
        <div className="container-text">
          <div class="text">
            100% <span>Made in Indonesia</span>{" "}
          </div>
          <div className="text2">
            Lorem ipsum dolor sit amet consectetur. Augue tortor fusce purus dis
            non vitae. Scelerisque rutrum et hendrerit urna nam pulvinar tellus
            consectetur.
          </div>
        </div>
      </div>
      <div class="content">
        <div className="d-flex align-items-center justify-content-center gap-3 logo-count ">
          <img class="logo" src={logo} alt="" />
          <div className="text-logo">Asrah Mode</div>
        </div>
        <div class="box">
          <h2>Masuk Akun</h2>
          <p>
            Belum punya akun?
            <Link className="link" to="/registrasi">
              Daftar
            </Link>
          </p>
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

          <button className="btnDark_long">Masuk</button>

          <div className="lineee">
            <div class="line "></div>
            <div class="text_line ">
              <p>atau</p>
            </div>
          </div>

          <button className="btnWhite_long center">
            <div className=" d-flex align-items-center gap-2">
              <img src={imgGoogle} alt="" />
              <div className="text">Masuk dengan Google</div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
