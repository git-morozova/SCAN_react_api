import "./Input.css";
import { Context } from "@/app";
import React, {FC, useContext, useState} from "react";

function Input({ type, style, placeholder, label, required, id, content }) {


  let styles = `input-default`;
  if (style) {
    styles = `input-default ` + style;
  }
  let star = "";
  if (required) {
    star = `\u00a0*`;
  }

  let errorText = "";
  switch (label) {
    case "ИНН компании":
      errorText = "Введите корректные данные";
      break;
    case "Количество документов в выдаче":
      errorText = "Обязательное поле";
      break;
    default:
      break;
  }

  let {store} = useContext(Context);
  let inputFunction = (e) => {

  };

if (content=="login") {
  let [login, setLogin] = useState<string>('');
  
  inputFunction = (e) => {
    setLogin(e.target.login)
  };
}
      
if (content=="password") {
  let [password, setPassword] = useState<string>(''); 
    
  inputFunction = (e) => {
    setPassword(e.target.password)
  };
}

  return (
    <>
      <label className="input-default-label">
        {label}
        {star}
      </label>
      <input id={id} onChange = {(e) => inputFunction(e)} type={type} className={styles} placeholder={placeholder} />
      <p className="input-errorText hidden">{errorText}</p>
    </>
  );
}

export default Input;
