import "./Table.scss";
import arrow from '@img/icons/table_arrow.png';
import arrowDark from '@img/icons/table_arrow-dark.png';
import _items from "./items";

function Table() {

    let itemsCount = _items.length; //число столбцов в таблице = число элементов в массиве
    let itemsCountCols = {gridTemplateColumns: `110px repeat(` + itemsCount + `, 1fr)`}; //запишем число столбцов в grid

    function scrollRight(e) {
        e.preventDefault();
        let tableBlocks = document.querySelector('.table__inner');
        let temp = tableBlocks.scrollLeft;
        let arrowRight = document.querySelector('#app-arrowRight');
        let arrowLeft = document.querySelector('#app-arrowLeft');
        let tableWidth = document.querySelector('.table__inner').offsetWidth;

        if ((itemsCount * 120) > (tableWidth - 110)) { 
            tableBlocks.scrollLeft += 200; 
            if (temp == tableBlocks.scrollLeft) {
                arrowRight.src = arrow;
            }
            arrowLeft.src = arrowDark;
        }
    }   
    
    function scrollLeft(e) {
        e.preventDefault();
        let tableBlocks = document.querySelector('.table__inner');
        let temp = tableBlocks.scrollLeft;
        let arrowRight = document.querySelector('#app-arrowRight');
        let arrowLeft = document.querySelector('#app-arrowLeft');
        let tableWidth = document.querySelector('.table__inner').offsetWidth;

        if ((itemsCount * 120) > (tableWidth - 110)) { 
            tableBlocks.scrollLeft -= 200;
            if (temp == tableBlocks.scrollLeft) {
                arrowLeft.src = arrow;
            }
            arrowRight.src = arrowDark;
        }
    }  

    window.onload = function() { 
        let tableWidth = document.querySelector('.table__inner').offsetWidth;
        let arrowLeft = document.querySelector('#app-arrowLeft');
        let arrowRight = document.querySelector('#app-arrowRight');
        arrowLeft.src = arrow;

        if ((itemsCount * 120) > (tableWidth - 110)) { //стрелка подсвечивается если сумма ширин столбцов больше ширины контейнера под таблицу
            arrowRight.src = arrowDark;
        } 

    };
    
  return (
    <>     
        <div className="table__main"> 
            <button className="table__btn table__btn--prev" onClick={scrollLeft}>
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
                        {_items.map((item) => { 
                        return (
                            <tr key={item.id}>
                                <td>{item.date}</td> 
                                <td>{item.total}</td> 
                                <td>{item.risks}</td> 
                            </tr>        
                        );
                        })}
                    </tbody>
                </table>
                
            </div>
            <button className="table__btn table__btn--next" onClick={scrollRight}>
                <img id="app-arrowRight" src={arrow} className="table__btn-arrow table__btn-arrow--right" alt=">" />
            </button>
        </div> 
    </>
  );
}


export default Table;
