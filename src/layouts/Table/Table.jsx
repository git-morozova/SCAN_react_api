import "./Table.scss";
import arrow from '@img/icons/table_arrow.png';
import arrowDark from '@img/icons/table_arrow-dark.png';
import _items from "./items";

import spinner from '@img/icons/spinner_big.png'

//let itemsCount = _items.length; //число столбцов в таблице = число элементов в массиве
let itemsCount = 1; // загрузка со спиннером - один столбец
let itemsCountCols = {gridTemplateColumns: `110px repeat(` + itemsCount + `, 1fr)`}; //запишем число столбцов в grid

function scroll(event,direction) {
    event.preventDefault();
    const tableBlocks = document.querySelector('.table__inner');
    let temp = tableBlocks.scrollLeft;
    let arrowRight = document.querySelector('#app-arrowRight');
    let arrowLeft = document.querySelector('#app-arrowLeft');

    if ((itemsCount * 120) > (tableBlocks.offsetWidth - 110)) {
        if (direction == "left") {
            tableBlocks.scrollLeft -= 200;
            arrowRight.src = arrowDark;
            if (temp == tableBlocks.scrollLeft) { //достингута граница таблицы при скролле
                arrowLeft.src = arrow;
            }
        } else {
            tableBlocks.scrollLeft += 200;  
            arrowLeft.src = arrowDark;
            if (tableBlocks.scrollLeft == temp) { //достингута граница таблицы при скролле
                arrowRight.src = arrow;
            }
        }  
    }           
}  

function Table() {

    window.onload = function() { 
        const tableBlocks = document.querySelector('.table__inner');
        let arrowRight = document.querySelector('#app-arrowRight');

        //при загрузке страницы:
        //правая стрелка подсвечивается, если сумма ширин столбцов больше ширины контейнера под таблицу
        if ((itemsCount * 120) > (tableBlocks.offsetWidth - 110)) { 
            arrowRight.src = arrowDark;
        } 
    };
    
  return (
    <>     
        <div className="table__main"> 
            <button className="table__btn table__btn--prev" onClick={(event) => {scroll(event, "left")}}>
                <img id="app-arrowLeft" src={arrow} className="table__btn-arrow table__btn-arrow--left" alt="<" />
            </button>
            <div id="app-table" className="table__block">
                
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
                                <div>Загружаем данные</div>
                            </td> 
                        </tr>      

                        {/* {_items.map((item) => { 
                        return (
                            <tr key={item.id}>
                                <td>{item.date}</td> 
                                <td>{item.total}</td> 
                                <td>{item.risks}</td> 
                            </tr>        
                        );
                        })} */}
                    </tbody>
                </table>
                
            </div>
            <button className="table__btn table__btn--next" onClick={(event) => {scroll(event, "right")}}>
                <img id="app-arrowRight" src={arrow} className="table__btn-arrow table__btn-arrow--right" alt=">" />
            </button>
        </div> 
    </>
  );
}


export default Table;
