import "./Input.css";
import React, {FC, useContext, useState} from "react";

function Input({ type, style, placeholder, label, required, id, content }) {


  let styles = `input-default`;
  let errorStyles = "input-errorText hidden";
  if (style) {
    styles = `input-default ` + style;
  }
  if (content == "login" || content == "password") {
    errorStyles = `input-errorText input-errorText-auth hidden`;
  }
  let star = "";
  if (required) {
    star = `\u00a0*`;
  }

  let errorText = "Введите корректные данные";
  let errorId = id + "-error";  

  let inputFunction = (e) => { };

  if (content=="login") {
    let [login, setLogin] = useState<string>('');
    
    inputFunction = (e) => {
      setLogin(e.target.login);
      checkRequiredFieldsAuth();
    };
  }
        
  if (content=="password") {
    let [password, setPassword] = useState<string>(''); 
      
    inputFunction = (e) => {
      setPassword(e.target.password);
      checkRequiredFieldsAuth();
    };
  }

  let checkRequiredFieldsAuth = () => {
    document.querySelector("#app-input-login-error")?.classList.add('hidden');
    document.querySelector("#app-input-password-error")?.classList.add('hidden');
    document.querySelector("#app-input-login")?.classList.remove('input-error');
    document.querySelector("#app-input-password")?.classList.remove('input-error');

    let button = document.querySelector('#app-button-login');
    if (!document.querySelector('#app-input-login').value || !document.querySelector('#app-input-password').value)
    {
      button?.classList.add('btn-disabled')
    } else {
      button?.classList.remove('btn-disabled')
    }
  }

  if (content=="inn" || content=="limit" || content=="range-start" || content=="range-end") {  
    inputFunction = (e) => {
      checkRequiredFieldsSearch();
    };
  }

  let checkRequiredFieldsSearch = () => {
    document.querySelector("#app-input-inn-error")?.classList.add('hidden');
    document.querySelector("#app-input-limit-error")?.classList.add('hidden');
    document.querySelector("#app-range-error")?.classList.add('hidden');
    document.querySelector("#app-input-inn")?.classList.remove('input-error');
    document.querySelector("#app-input-limit")?.classList.remove('input-error');
    document.querySelector("#app-range-start")?.classList.remove('input-error');
    document.querySelector("#app-range-end")?.classList.remove('input-error');

    let button = document.querySelector('#app-button-request');
    if (!document.querySelector('#app-input-inn').value || !document.querySelector('#app-input-limit').value
    || (document.querySelector('#app-range-start').value == "") || (document.querySelector('#app-range-end').value == ""))
    {
      button?.classList.add('btn-disabled')
    } else {
      button?.classList.remove('btn-disabled')
    }
  }

  return (
    <>
      <label className="input-default-label">
        {label}
        {star}
      </label>
      <input id={id} onChange = {(e) => inputFunction(e)} type={type} className={styles} placeholder={placeholder} required={required}/>
      <p id={errorId} className={errorStyles}>{errorText}</p>
    </>
  );
}

export default Input;
