import './Header.css'
import UserVidget from '@/components/UserVidget/UserVidget'
import logo from '@img/logo.png'
import logo_inv from '@img/logo_inv.png'

import { Link } from "react-router-dom";
import React, { useState, useRef } from "react";
import { useMediaQuery } from 'react-responsive'
import { StyledMenu, StyledLink } from "./Header.styled";
import BurgerMenu from '@/components/BurgerMenu/BurgerMenu'
import Button from '@/components/Button/Button'

import { Context } from "@/app";
import { useContext } from "react";

function Header() {
  const [open, setOpen] = useState<boolean>(false);
  const node = useRef<HTMLDivElement>(null);
  const close = () => setOpen(false);
  
  const isDesktop = useMediaQuery({
    query: '(min-width: 787px)'
  })

  const { store } = useContext(Context);

  return (
  <header id="app-header" className='header'>
    <div className='container flex flex-btw' >
        <div className='logo'>
          <Link to="/">
            <img src={logo} className="logo__img" alt="СКАН"/>
          </Link>
        </div>
      {isDesktop ?  (
        <>
          <div>
            <ul className='menu flex'>
                <li><Link to="/">Главная</Link></li>
                <li><Link to="#">Тарифы</Link></li>
                <li><Link to="#">FAQ</Link></li>
              </ul>       
          </div> 
          <UserVidget/>
        </>
        ) : (
        <>

          <UserVidget/>
          <div ref={node}>
            <StyledMenu open={open}>          
              <div className='logo'>
                <Link to="/">
                  <img src={logo_inv} className="logo__img" alt="СКАН"/>
                </Link>
              </div>
              <div className='menu__mobLinks flex'>
                <Link to="/" onClick={() => close()}>Главная</Link>
                <Link to="#" onClick={() => close()}>Тарифы</Link>
                <Link to="#" onClick={() => close()}>FAQ</Link>
              </div>
              {!store.checkAuth() ? (  <>
              <div className='menu__mobReg flex'>                
                <a className='auth__reg-burger' onClick={() => close()}>Зарегистрироваться</a>
              </div>
              <Link to="/auth" >
                <Button onClick={() => close()} type="button" content="auth" label="Войти" style="btn-small auth__reg-btn"/>
              </Link> </>
               ) : <>               
               <Button type="button" content="logout" label="Выйти" style="btn-small auth__reg-btn"/>
             
             </>
             }
            </StyledMenu>
            <BurgerMenu open={open} setOpen={setOpen} /> 
          </div>
        </>
      )}
      
    </div>  
  </header> 
  ) 
}

export default Header