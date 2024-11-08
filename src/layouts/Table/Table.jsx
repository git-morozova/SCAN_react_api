import "./Table.scss";
import arrow from '@img/icons/carousel_arrow.svg';

function Table() {
 
  return (
    <> 
    
        <div className="table__main"> 
    <button className="table__btn table__btn--prev">
            <img src={arrow} className="table__btn-arrow table__btn-arrow--left" alt="<" />
        </button>
    <div id="app-table" className="table__block">
        
        <table className="table__inner"> 
            <thead className="table__thead">
                <tr>
                    <th>Период</th>
                    <th>Всего</th>
                    <th>Риски</th>
                </tr>
            </thead>
            <tbody>      
                <tr>
                    <td>10.09.2021</td> 
                    <td>5</td> 
                    <td>0</td> 
                </tr>
                <tr>
                    <td><div className="borderTop"></div>10.09.2021</td>
                    <td><div className="borderMiddle"></div>5</td>
                    <td><div className="borderBottom"></div>0</td>
                </tr>
                <tr>
                    <td><div className="borderTop"></div>10.09.2021</td>
                    <td><div className="borderMiddle"></div>5</td>
                    <td><div className="borderBottom"></div>0</td>
                </tr>
                <tr>
                    <td><div className="borderTop"></div>10.09.2021</td>
                    <td><div className="borderMiddle"></div>5</td>
                    <td><div className="borderBottom"></div>0</td>
                </tr>
                <tr>
                    <td><div className="borderTop"></div>10.09.2021</td>
                    <td><div className="borderMiddle"></div>5</td>
                    <td><div className="borderBottom"></div>0</td>
                </tr>
                <tr>
                    <td><div className="borderTop"></div>10.09.2021</td>
                    <td><div className="borderMiddle"></div>5</td>
                    <td><div className="borderBottom"></div>0</td>
                </tr>
                <tr>
                    <td><div className="borderTop"></div>10.09.2021</td>
                    <td><div className="borderMiddle"></div>5</td>
                    <td><div className="borderBottom"></div>0</td>
                </tr>
                <tr>
                    <td><div className="borderTop"></div>10.09.2021</td>
                    <td><div className="borderMiddle"></div>5</td>
                    <td><div className="borderBottom"></div>0</td>
                </tr>
                <tr>
                    <td><div className="borderTop"></div>10.09.2021</td>
                    <td><div className="borderMiddle"></div>5</td>
                    <td><div className="borderBottom"></div>0</td>
                </tr>
                <tr>
                    <td><div className="borderTop"></div>10.09.2021</td>
                    <td><div className="borderMiddle"></div>5</td>
                    <td><div className="borderBottom"></div>0</td>
                </tr>
            </tbody>
        </table>
        
    </div>
    <button className="table__btn table__btn--next">
    <img src={arrow} className="table__btn-arrow table__btn-arrow--right" alt=">" />
</button>
</div> 
 </>
  );
}

export default Table;
