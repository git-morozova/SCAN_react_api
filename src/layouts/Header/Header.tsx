import './Header.css'
import UserVidget from '@/components/UserVidget/UserVidget'
import logo from '@img/logo.png'
import logo_inv from '@img/logo_inv.png'

import React, { useState, useRef } from "react";
import { useMediaQuery } from 'react-responsive'
import { StyledMenu, StyledLink } from "./Header.styled";
import BurgerMenu from '@/components/BurgerMenu/BurgerMenu'
import Button from '@/components/Button/Button'

function Header() {
  const [open, setOpen] = useState<boolean>(false);
  const node = useRef<HTMLDivElement>(null);
  const close = () => setOpen(false);
  
  const isDesktop = useMediaQuery({
    query: '(min-width: 787px)'
  })

  return (
  <header id="app-header" className='header'>
    <div className='container flex flex-btw' >
        <div className='logo'>
          <a href="/">
            <img src={logo} className="logo__img" alt="СКАН"/>
          </a>
        </div>
      {isDesktop ?  (
        <>
          <div>
            <ul className='menu flex'>
                <li><a href="/">Главная</a></li>
                <li><a href="/">Тарифы</a></li>
                <li><a href="/">FAQ</a></li>
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
                <a href="/">
                  <img src={logo_inv} className="logo__img" alt="СКАН"/>
                </a>
              </div>
              <div className='menu__mobLinks flex'>
                <StyledLink onClick={() => close()}>Главная</StyledLink>
                <StyledLink onClick={() => close()}>Тарифы</StyledLink>
                <StyledLink onClick={() => close()}>FAQ</StyledLink>
              </div>
              <div className='menu__mobReg flex'>                
                <a className='auth__reg-burger' onClick={() => close()}>Зарегистрироваться</a>
              </div>
              <Button onClick={() => close()} type="auth" label="Войти" style="btn-small auth__reg-btn"/>
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