import "./AuthForm.css";
import Button from "@/components/Button/Button";
import Input from "@/components/Input/Input.tsx";

import google from "@img/icons/google.svg";
import facebook from "@img/icons/fb.svg";
import yandex from "@img/icons/ya.svg";

import React, {FC} from "react";
/*
sf_student9
DTdEwAn

sf_student1
4i2385j

sf_student4
Br1+tbG

sf_student6
eczpWCB

sf_student8
5QB0KM/

sf_student7
P6VcKNf

sf_student5
LuwAwJf

sf_student10
KHKfTXb

sf_student3
6z9ZFRs

sf_student2
lV8xjCH
*/

const AuthForm: FC = () => {

  return (    
  <>   
        
    <form id="app-auth-form" className="auth__form">
      <div className="flex authForm__block">
        <div className="flex authForm__top stretch">
          <a className="authForm__top-enter">Войти</a>
          <a className="authForm__top-reg">Зарегистрироваться</a>
        </div>

         <div className="authForm__main grey stretch">
          <Input onChange={e => setLogin(e.target.value)}
            style="input-auth" content="login" id="app-input-login"
            type="text"
            label="Логин или номер телефона:"
          />
          <Input onChange={e => setPassword(e.target.value)}  id="app-input-password" content="password"
            style="input-auth" type="password" label="Пароль:" />  
        </div> 

        <Button 
                  type="button" content="login" 
          label="Войти"
          style="stretch authForm__submit btn-disabled"
        />
        <a className="authForm__passLink">Восстановить пароль</a>

        <div className="authForm__bottom grey stretch">
          <p className="authForm__bottom-label">Войти через:</p>
          <div className="authForm__bottom-icons flex">
            <a href="/">
              <div className="authForm__bottom-icon">
                <img src={google} alt="google" />
              </div>
            </a>
            <a href="/">
              <div className="authForm__bottom-icon">
                <img src={facebook} alt="facebook" />
              </div>
            </a>
            <a href="/">
              <div className="authForm__bottom-icon">
                <img src={yandex} alt="yandex" />
              </div>
            </a>
          </div>
        </div>
      </div>
    </form>
    </>
  );
}

export default AuthForm;
