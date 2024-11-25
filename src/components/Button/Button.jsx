import "./Button.css";
import { Context } from "@/app";
import React, {FC, useContext, useState} from "react";


function Button({ label, style, content}) {
  const {store} = useContext(Context);

  let styles = `btn`;
  if (style) {
    styles = `btn ` + style;
  }
  
  const submitFunction = () => {
    
    if (content=="login") {
    store.login(document.querySelector("#app-input-login").value, document.querySelector("#app-input-password").value);
    } 
  };
  

  return <button type="button" onClick = {submitFunction} className={styles}>{label}</button>



}

export default Button;
