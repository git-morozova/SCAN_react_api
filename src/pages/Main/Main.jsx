import "./Main.css";

import Header from "@/layouts/Header/Header.tsx";
import Footer from "@/layouts/Footer/Footer";
import Button from "@/components/Button/Button";
import Carousel from "@/layouts/Carousel/Carousel";
import Tariff from "@/layouts/Tariff/Tariff";
import heroImage from "@img/hero.jpg";
import blockImage from "@img/main_block2.jpg";
import blockImageMob from "@img/main_block2_mob.jpg";
import { Link } from "react-router-dom";

import { Context } from "@/app";
import { useContext } from "react";

function Main() {  
  const { store } = useContext(Context);

  return (
    <>
      <Header />
      <main className="main">
        <div className="container heroMain flex">
          <div className="heroHeader">
            <h1 className="big">
              Сервис по&nbsp;поиску публикаций о&nbsp;компании
              по&nbsp;ее&nbsp;ИНН
            </h1>
            <p className="heroText">
              Комплексный анализ публикаций, получение данных
              в&nbsp;формате&nbsp;PDF на&nbsp;электронную почту.
            </p>
            {store.checkAuth() ? (
              <>
                <Link to="/search">
                  <Button type="request" label="Запросить данные" />
                </Link>
              </>
            ) : (
              <></>
            )}
          </div>
          <div className="heroImage">
            <img src={heroImage} alt="heroImage" />
          </div>
        </div>

        <div className="container">
          <h2 className="blockHeader">Почему именно&nbsp;мы</h2>
          <Carousel />
          <div className="blockImage">
            <img src={blockImage} alt="blockImage" />
          </div>
          <div className="blockImageMob">
            <img src={blockImageMob} alt="blockImageMob" />
          </div>
          <h2 className="blockHeader">наши тарифы</h2>
          <Tariff />
        </div>
      </main>
      <Footer />
    </>
  );
}

export default Main;
