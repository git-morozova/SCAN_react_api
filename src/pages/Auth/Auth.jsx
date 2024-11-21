import './Auth.css'

import Header from '@/layouts/Header/Header'
import Footer from '@/layouts/Footer/Footer'
import AuthForm from '@/layouts/AuthForm/AuthForm'
import heroImage from '@img/auth_hero.png'
import lock from '@img/icons/auth_lock.svg'

function Auth() {

  return (
    <>
      <Header />
      <main className="main"> 
        <div className="container flex auth__page">  
          <div className="auth__title">   
            <h1>Для оформления подписки на&nbsp;тариф необходимо авторизоваться</h1> 
            <div className="auth__imgBlock">
                <img src={heroImage} alt="heroImage" className="auth__img"/>
            </div>           
          </div>     
          <div className="auth__formBlock"> 
            <img src={lock} alt="lock" className="auth__lock"/>
            <AuthForm />
          </div>
          <div className="auth__imgBlock-mob">
                <img src={heroImage} alt="heroImage" className="auth__img"/>
            </div>
        </div>       
      </main>
      <Footer />
    </>
  )
}

export default Auth