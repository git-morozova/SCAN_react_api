import "./Results.css";

import Header from "@/layouts/Header/Header";
import Footer from "@/layouts/Footer/Footer";
import Table from "@/layouts/Table/Table";
import Document from "@/layouts/Document/Document";

import heroImage from "@img/results_hero.png";

function Results() {
  return (
    <>
      <Header />
      <main className="main">
        <div className="container">
          <div className="results__top">
            <div className="results__title">
              <h1>
                Ищем. Скоро
                <br />
                будут результаты
              </h1>
              <p className="results__text">
                Поиск может занять некоторое время,
                <br />
                просим сохранять терпение.
              </p>
            </div>
            <img src={heroImage} alt="heroImage" className="results__img" />
          </div>
        </div>

        <div className="container">
          <h2 className="results__header">Общая сводка</h2>
          <p className="results__found grey">Найдено 4 221 вариантов</p>
          <Table />
          <h2 className="results__header">Список документов</h2>
          <Document />
        </div>
      </main>
      <Footer />
    </>
  );
}

export default Results;
