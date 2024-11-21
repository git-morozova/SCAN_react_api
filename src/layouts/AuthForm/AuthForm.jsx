import "./AuthForm.css";
import Button from "@/components/Button/Button";
import Input from "@/components/Input/Input";

import google from "@img/icons/google.svg";
import facebook from "@img/icons/fb.svg";
import yandex from "@img/icons/ya.svg";

function AuthForm() {
  return (
    <form id="app-auth-form" className="auth__form">
      <div className="flex authForm__block">
        
        <div className="flex authForm__top stretch">
          <a className="authForm__top-enter">Войти</a>
          <a className="authForm__top-reg">Зарегистрироваться</a>
        </div>

        <div className="authForm__main grey stretch">
          <Input style="input-auth" type="text" label="Логин или номер телефона:"/>
          <Input style="input-auth" type="password" label="Пароль:" />
        </div>

        <Button
          type="request"
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
  );
}

export default AuthForm;
