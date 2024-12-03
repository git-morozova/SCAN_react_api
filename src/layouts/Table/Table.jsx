import "./Table.scss";
import arrow from "@img/icons/table_arrow.png";
import arrowDark from "@img/icons/table_arrow-dark.png";
import React, { useState, useEffect } from 'react';
import spinner from "@img/icons/spinner_big.png";

import { observer } from 'mobx-react-lite'

import { Context } from "@/app";
import { useContext } from "react";

let itemsCount;
let itemsCountCols;

//скролл таблицы - десктоп
function scroll(event, direction) {
  event.preventDefault();
  const tableBlocks = document.querySelector(".table__inner");
  let temp = tableBlocks.scrollLeft;
  let arrowRight = document.querySelector("#app-arrowRight");
  let arrowLeft = document.querySelector("#app-arrowLeft");

  if (itemsCount * 120 > tableBlocks.offsetWidth - 110) {
    if (direction == "left") {
      tableBlocks.scrollLeft -= 200;
      arrowRight.src = arrowDark;
      if (temp == tableBlocks.scrollLeft) {
        //достингута граница таблицы при скролле
        arrowLeft.src = arrow;
      }
    } else {
      tableBlocks.scrollLeft += 200;
      arrowLeft.src = arrowDark;
      if (tableBlocks.scrollLeft == temp) {
        //достингута граница таблицы при скролле
        arrowRight.src = arrow;
      }
    }
  }
}

//скролл таблицы - моб
function scrollMob(event, direction) {
  event.preventDefault();
  let arrowRight = document.querySelector("#app-arrowRight-mob");
  let arrowLeft = document.querySelector("#app-arrowLeft-mob");
  let current = document.querySelector('tr[class="table__row-mob"]'); //для точного соответствия, без hidden
  let all = document.querySelectorAll('tr[class="table__row-mob hidden"]');
  let partsArray = current.id.split("_");

  if (direction == "left") {
    let prevId;
    if (Number(partsArray[1]) == 0) {
      prevId = all.length;
      arrowLeft.src = arrow;
    } else {
      prevId = Number(partsArray[1]) - 1;
      let prevIdSelector = `#row-mob_` + prevId;
      let prevTr = document.querySelector(prevIdSelector);
      prevTr.className = "table__row-mob";
      current.className = "table__row-mob hidden";
      arrowRight.src = arrowDark;
    }
  }

  if (direction == "right") {
    let nextId;
    if (Number(partsArray[1]) == all.length) {
      nextId = all.length;
      arrowRight.src = arrow;
    } else {
      nextId = Number(partsArray[1]) + 1;
      let nextIdSelector = `#row-mob_` + nextId;
      let nextTr = document.querySelector(nextIdSelector);
      nextTr.className = "table__row-mob";
      current.className = "table__row-mob hidden";
      arrowLeft.src = arrowDark;
    }
  }
}


export const Table = observer(() => {  //observer отслеживает изменения в store и ререндерит страницу
  const { store } = useContext(Context);  

  //searchResultArray
  //собираем результат в удобный массив объектов
  let searchResultArray = [];
  
  for (var keyTotal in store.getTotalDocuments) {
    let item = store.getTotalDocuments[keyTotal]; 
    let value = item.value;  
    searchResultArray.push({"id": keyTotal, "date": item.date, "total": value})
  }
  
  for (var keyRisk in store.getRiskFactors) {
    let item = store.getRiskFactors[keyRisk]; 
    let value = item.value;      
    const tempObj = searchResultArray.find(({ id }) => id === keyRisk);
    tempObj["risks"] = value
  }

  // форматируем дату
  for (var keyDate in searchResultArray) {
    let dateRaw = searchResultArray[keyDate].date; // 2024-09-01T03:00:00+03:00
    let formattedDate = new Date(dateRaw); //Mon Jul 01 2024 03:00:00 GMT+0300 (Москва, стандартное время)
    formattedDate = formattedDate.toISOString().split('T')[0] //2024-07-01
    formattedDate = formattedDate.split("-").reverse().join("."); //01.07.2024 
    searchResultArray[keyDate].date = formattedDate    
  } 

  //спиннер 
  function Loader() {          
    itemsCountCols = {
      gridTemplateColumns: `110px repeat(1, 1fr)`, //пока рендерим спиннер - один столбец
    };
    return (
      <>     
        <table className="table__inner" style={itemsCountCols}>
          <thead className="table__thead">
            <tr>
              <th>Период</th>
              <th>Всего</th>
              <th>Риски</th>
            </tr>
          </thead>        
          <tbody>
            <tr>
              <td className="table__loader">
                <img src={spinner} className="table__spinner" alt="загрузка..." /> 
                <div className="table__spinner-text" >Загружаем данные</div>
              </td> 
            </tr> 
          </tbody> 
        </table>            
      </> 
    );
  }

  // MainContent
  //блок MainContent выводится после загрузки данных
  function MainContent() {  
    itemsCount = searchResultArray.length; //число столбцов в таблице = число элементов в массиве
    itemsCountCols = {
      gridTemplateColumns: `110px repeat(` + itemsCount + `, 1fr)`, //запишем число столбцов в grid
    };

    useEffect(() => {
      const tableBlocks = document.querySelector(".table__inner");
      let arrowRight = document.querySelector("#app-arrowRight");
      let arrowRightMob = document.querySelector("#app-arrowRight-mob");

      //ДЕСКТОП - правая стрелка подсвечивается, если сумма ширин столбцов больше ширины контейнера под таблицу
      if (itemsCount * 120 > tableBlocks.offsetWidth - 110) {
        arrowRight.src = arrowDark;
      }

      //МОБ - правая стрелка подсвечивается, если число элементов массива больше одного
      if (itemsCount > 1) {
        arrowRightMob.src = arrowDark;
      }

      //МОБ - показать первую строку таблицы
      if(document.querySelector("#row-mob_0")) {
        document.querySelector("#row-mob_0").className = "table__row-mob";
      }
    }, []);

    return (      
      <>   
        <table className="table__inner" style={itemsCountCols}>
          <thead className="table__thead">
            <tr>
              <th>Период</th>
              <th>Всего</th>
              <th>Риски</th>
            </tr>
          </thead>

          {searchResultArray.map((item) => {
            let id = "row_" + item.id;
            let idMob = "row-mob_" + item.id;
            return (
              <tbody key={item.id}>
                <tr className="table__row-mob hidden" id={idMob}>
                  <td>{item.date}</td>
                  <td>{item.total}</td>
                  <td>{item.risks}</td>
                </tr>
                <tr className="table__row" id={id}>
                  <td>{item.date}</td>
                  <td>{item.total}</td>
                  <td>{item.risks}</td>
                </tr>
              </tbody>
            );
          })}     

        </table>        
      </>    
    );
  }
  
  return ( 
    <>
      <div className="table__main">
        <button
          className="table__btn table__btn-mob--prev"
          onClick={(event) => {
            scrollMob(event, "left");
          }}
        >
          <img
            id="app-arrowLeft-mob"
            src={arrow}
            className="table__btn-arrow table__btn-arrow--left"
            alt="<"
          />
        </button>
        <button
          className="table__btn table__btn--prev"
          onClick={(event) => {
            scroll(event, "left");
          }}
        >
          <img
            id="app-arrowLeft"
            src={arrow}
            className="table__btn-arrow table__btn-arrow--left"
            alt="<"
          />
        </button>
        <div id="app-table" className="table__block">   

        {!store.requestSuccess ? <Loader /> : <MainContent />}        

        </div>
        <button
          className="table__btn table__btn-mob--next"
          onClick={(event) => {
            scrollMob(event, "right");
          }}
        >
          <img
            id="app-arrowRight-mob"
            src={arrow}
            className="table__btn-arrow table__btn-arrow--right"
            alt=">"
          />
        </button>
        <button
          className="table__btn table__btn--next"
          onClick={(event) => {
            scroll(event, "right");
          }}
        >
          <img
            id="app-arrowRight"
            src={arrow}
            className="table__btn-arrow table__btn-arrow--right"
            alt=">"
          />
        </button>
      </div>
    </>   
  );
})

export default Table;
