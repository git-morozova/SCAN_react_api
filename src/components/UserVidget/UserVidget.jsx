import "./UserVidget.css";
import Button from "@/components/Button/Button";
import authLine from "@img/icons/auth_line.svg";
import spinner from "@img/icons/spinner.png";
import avatar from "@img/avatar.png";
import { Link } from "react-router-dom";
import { Context } from "@/app";
import { useContext } from "react";
import React, { useState, useEffect } from 'react';

import { observer } from 'mobx-react-lite'

//сам компонент
export const UserVidget = observer(() => { // отслеживание изменений для рендера после получения ответа от сервера
  const { store } = useContext(Context);

  //спиннер 
  function Loader() {
    return (
      <>     
        <img src={spinner} className="counters__img" alt="загрузка..." />      
      </>
    );
  }

  //блок выводится после загрузки данных
  function MainContent() { 

    useEffect(() => {
      //вызываем после рендера блока
          let used = document.querySelector('#app-counter-used');
          used.innerHTML = store.getUsedCompanyCount;

          let limit = document.querySelector('#app-counter-limit');
          limit.innerHTML = store.getCompanyLimit;
    }, []);   

    return (
      <>    
        <div className="flex counters__inner">
          <div className="counters__text">Использовано компаний</div>
          <div className="counters__sum" id="app-counter-used"></div>
        </div>
        <div className="flex counters__inner">
          <div className="counters__text">Лимит по компаниям</div>
          <div className="counters__sum bright" id="app-counter-limit"></div>
        </div>      
      </>
    );
  }

  if (!store.checkAuth()) {
    return (
      <>
        <div id="app-header-auth" className="auth flex">
          <div className="auth__reg">
            <a className="grey" href="/">
              Зарегистрироваться
            </a>
          </div>
          <img src={authLine} className="auth__line" alt="|" />
          <div className="auth__btn">
            <Link to="/auth">
              <Button type="auth" label="Войти" style="btn-small" />
            </Link>
          </div>
        </div>
      </>
    );
  } else {     

  return (

    <>
      <div id="app-header-user" className="user flex flex-btw">
        <div className="counters flex">
        {!store.countSuccess ? <Loader /> : <MainContent />}
        
        </div>
        <div className="flex user-block">
          <div className="user-block__main">
            <div className="main__name">Алексей&nbsp;А.</div>
            <Button
              content="logout"
              type="button"
              label="Выйти"
              style="btn-transparent"
            />
          </div>
          <div className="user-block__avatar">
            <img src={avatar} className="avatar__img" alt="avatar" />
          </div>
        </div>
      </div>
    </>       
  );
  }
})

export default UserVidget;