import React, { useState } from "react";
import "./../../assets/style/style_component/Input.css";

const InputGlobal = ({
  register,
  errors,
  name,
  placeholder,
  type_input,
  tittle,
  alert = null,
}) => {
  const [type, setType] = useState(false);

  const setTypePassword = () => {
    setType(!type);
  };

  return (
    <>
      {type_input == "text" ? (
        <>
          <div className="tittle_input_global">{tittle}</div>
          <div className="global_inputText">
            <input
              type="text"
              placeholder={placeholder}
              {...register(name, { required: "Input tidak boleh kosong" })}
            />
          </div>
        </>
      ) : type_input == "password" ? (
        <>
          <div className="tittle_input_global">{tittle}</div>
          <div className="global_inputText">
            <input
              type={type ? "text" : "password"}
              placeholder={placeholder}
              {...register(name, { required: "Input tidak boleh kosong" })}
            />
            {/* <img
              onClick={() => setTypePassword()}
              className={type ? "type_eyePassword" : "type_eyeText"}
              src={icnEye}
              alt=""
            /> */}
          </div>
        </>
      ) : type_input == "area" ? (
        <>
          <div className="tittle_input_global">{tittle}</div>
          <div className="global_inputText">
 
            <textarea name="" id="" cols="30" rows="10"></textarea>
          </div>
        </>
      ) : null}
      {alert && <p className="global_errorText">{alert}</p>}

      {errors[name] && (
        <p className="global_errorText">{errors[name].message}</p>
      )}
    </>
  );
};

export default InputGlobal;
