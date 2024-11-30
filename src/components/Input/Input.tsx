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

  let errorText = "Введите корректные данные";
  let errorId = id + "-error";  

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

if (content=="inn" || content=="limit" || content=="range-start" || content=="range-end") {
  
  inputFunction = (e) => {
    checkRequiredFields();
  };
}

let checkRequiredFields = () => {
  if (!document.querySelector('#app-input-inn').value && !document.querySelector('#app-input-limit').value
  && (document.querySelector('#app-range-start').value == "") && (document.querySelector('#app-range-end').value == "")) {
    console.log("null2")
  }
}

  return (
    <>
      <label className="input-default-label">
        {label}
        {star}
      </label>
      <input id={id} onChange = {(e) => inputFunction(e)} type={type} className={styles} placeholder={placeholder} required={required}/>
      <p id={errorId} className="input-errorText hidden">{errorText}</p>
    </>
  );
}

export default Input;
