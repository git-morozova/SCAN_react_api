import './Header.css'
import UserVidget from '@/components/UserVidget/UserVidget'

import logo from '@img/logo.png'

function Header() {

  return (
    <header id="app-header" className='header'>
      <div className='container flex flex-btw' >
        <div className='logo'>
          <a href="/">
            <img src={logo} className="logo__img" alt="СКАН" />
          </a>
        </div>
        <ul className='menu flex'>
          <li><a href="/">Главная</a></li>
          <li><a href="/">Тарифы</a></li>
          <li><a href="/">FAQ</a></li>
        </ul>
        <UserVidget/>
      </div>
    </header> 
  )
}

export default Header
