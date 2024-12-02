import "./Search.css";

import validateInn from "@/features/validateInn";

import { observer } from 'mobx-react-lite'
import Button from "@/components/Button/Button";
import Header from "@/layouts/Header/Header";
import Footer from "@/layouts/Footer/Footer";
import Table from "@/layouts/Table/Table";
import Document from "@/layouts/Document/Document";

import heroImageResults from "@img/results_hero.png";
import heroImageSearch from "@img/search_hero.png";
import sheet from "@img/search_sheet.svg";
import folders from "@img/search_folders.svg";

import Input from "@/components/Input/Input.tsx";
import Checkbox from "@/components/Checkbox/Checkbox";
import Select from "@/components/Select/Select";
import Range from "@/components/Range/Range";
import React, { useState, useEffect } from 'react';

import { Context } from "@/app";
import { useContext } from "react";

// этот компонент рендерим после успешной отправки запроса
const Results = observer(() => {
  const { store } = useContext(Context); 
  let count = store.countResults;

  return  (
  <>
  <div id="app-results">
    <div className="container">
      <div className="results__top">
        <div className="results__title">
          <h1>Ищем. Скоро будут результаты</h1>
          <p className="results__text">
            Поиск может занять некоторое время, просим сохранять терпение.
          </p> 
        </div>
        <img src={heroImageResults} alt="heroImage" className="results__img" />
      </div>
    </div>

    <div className="container">
      <h2 className="results__header">Общая сводка</h2>
      <p className="results__found grey"> 
        {!store.requestSuccess ? "..." : "Найдено " + count + " вариантов"}   
      </p>
      <Table />
      <h2 className="results__header">Список документов</h2>
      <Document />
      <div className="results__more">
        <Button type="request" label="Показать больше" content="showMore"/>
      </div>
    </div>
  </div>
  </>
  )
})

//основной компонент
function Search() {

  const [showComponent, setShowComponent] = useState(false);
  const handleSubmit = () => { setShowComponent(true); };

  //обнулим store
  const { store } = useContext(Context); 
  store.requestSuccess = false;
  store.searchResultTotalDocuments = {};
  store.searchResultRiskFactors = {};

  useEffect(() => {  
    //обнулим поля на случай, если юзер вернулся на страницу с results
    document.querySelector("#app-input-limit").value = ""
    document.querySelector("#app-input-inn").value = "";

    //функция рендера результатов
    document.querySelector('#app-button-request').addEventListener('click', function() { 

      let inn = document.querySelector("#app-input-inn").value;
      let limit = document.querySelector("#app-input-limit").value; 
      let validateInnResult = validateInn(inn);

      //валидация полей
      if(!inn || !validateInnResult || !limit || limit < 1 || limit > 1000 || isNaN(limit) ||
        document.querySelector("#app-range-start").value == "" || 
        document.querySelector("#app-range-end").value == "" ) {
          return false
        } else {
          setShowComponent(true);
          //показываем результаты поиска
          document.querySelector("#app-search").classList.add('hidden'); 
          window.scrollTo({ top: 0, behavior: 'smooth' });        //прокрутка наверх страницы  
        }
    })
  }, []);

  return (
    <>    
      <Header />
      <main className="main">
        
        {showComponent && <Results />}
        
        <div id="app-search" className="">
          <div className="container">
            <div className="search__top">
              <div className="search__title">
                <h1>Найдите необходимые данные в&nbsp;пару кликов</h1>
                <p className="search__text">
                  Задайте параметры поиска.
                  <br />
                  Чем больше заполните, тем&nbsp;точнее поиск
                </p>
              </div>
              <div className="search__icons">
                <img src={sheet} alt="sheet" className="search__img-sheet" />
                <img
                  src={folders}
                  alt="folders"
                  className="search__img-folders"
                />
              </div>
            </div>
          </div>

          <div className="search__formBlock">
          <form id="app-search-form" className="search__form" >
            <div className="flex searchForm__block">
              <div className="searchForm__top stretch">
                <div className="searchForm__top-left">
                  <Input
                    type="text"
                    content="inn"
                    style="searchForm__input"
                    placeholder="10 цифр"
                    label="ИНН компании"
                    required
                    id="app-input-inn"
                  />
                  <Select
                    style="searchForm__input"
                    label="Тональность"
                    id="app-select-tone"
                  />
                  <Input
                    type="text"
                    content="limit"
                    style="searchForm__input"
                    placeholder="От 1 до 1000"
                    label="Количество документов в выдаче"
                    required
                    id="app-input-limit"
                  />
                </div>
                <div className="searchForm__top-right">
                  <Checkbox
                    id="app-search_max"
                    style="searchForm__checkbox"
                    label="Признак максимальной полноты"
                  />
                  <Checkbox
                    id="app-search_business"
                    style="searchForm__checkbox"
                    label="Упоминания в бизнес-контексте"
                  />
                  <Checkbox
                    id="app-search_headliner"
                    style="searchForm__checkbox"
                    label="Главная роль в публикации"
                  />
                  <Checkbox
                    id="app-search_risk"
                    style="searchForm__checkbox"
                    label="Публикации только с риск-факторами"
                  />
                  <Checkbox
                    id="app-search_tech"
                    style="searchForm__checkbox"
                    label="Включать технические новости рынков"
                  /> 
                  <Checkbox
                    id="app-search_anons"
                    style="searchForm__checkbox"
                    label="Включать анонсы и календари"
                  />
                  <Checkbox
                    id="app-search_news"
                    style="searchForm__checkbox"
                    label="Включать сводки новостей"
                  />
                </div>
              </div>
              <div className="searchForm__bottom flex stretch">
                <div className="searchForm__range">
                  <Range
                    id="app-search_max"
                    label="Диапазон поиска"
                    required
                  />
                </div>

                <div className="searchForm__btn">
                  <Button
                    content="request"
                    label="Поиск"
                    style="searchForm__submit btn-disabled" 
                    onClick={handleSubmit}
                  />
                  <p className="searchForm__submitLabel">
                    * Обязательные к заполнению поля
                  </p>
                </div>
              </div>
            </div>
          </form> 
            <img src={heroImageSearch} alt="heroImage" className="search__img-hero" />
          </div>
        </div>

      </main>

      <Footer />
    </>
  );
}

export default Search;
