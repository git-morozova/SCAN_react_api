import './Main.css'

import Header from '@/layouts/Header/Header'
import Footer from '@/layouts/Footer/Footer'
import Button from '@/components/Button/Button'
import Carousel from '@/layouts/Carousel/Carousel'
import Tariff from '@/layouts/Tariff/Tariff'
import heroImage from '@img/hero.jpg'
import blockImage from '@img/main_block2.jpg'

function Main() {

  return (
    <>
      <Header />
      <main className="main"> 
        <div className="container flex">       
          <div className="heroHeader">    
            <h1 className="big">Сервис по&nbsp;поиску публикаций о&nbsp;компании по&nbsp;ее&nbsp;ИНН</h1>      
            <p className="heroText">
              Комплексный анализ публикаций, получение данных<br />в&nbsp;формате&nbsp;PDF на&nbsp;электронную почту.
            </p>
            <Button type="request" label="Запросить данные"/>
            </div>
          <div className="heroImage">    
            <img src={heroImage} alt="heroImage" />
          </div>
        </div>

        <div className="container">     
            <h2 className="blockHeader">Почему именно мы</h2> 
            <Carousel /> 
            <div className="blockImage">    
              <img src={blockImage} alt="blockImage" />
            </div>
            <h2 className="blockHeader">наши тарифы</h2>             
            <Tariff />
        </div>        
      </main>
      <Footer />
    </>
  )
}

export default Main