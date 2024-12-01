import "./Range.css";

import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale } from "react-datepicker";
import { ru } from "date-fns/locale/ru";
registerLocale("ru", ru);

function Range({ label, required }) {
  //endDate
  let [endDate, setEndDate] = useState(new Date());

  //pastDate
  let milliseconds = new Date().getTime();
  let pastDate = new Date(milliseconds - 31536000000);// 31536000000 миллисекунд в году
  let [startDate, setStartDate] = useState(pastDate);
  
 //для валидации endDate
  let today = new Date();

  //декоратор для setStartDate / setEndDate
  const checkRequiredFields = function(fn) {
    return function(...args) {
      fn(...args);
      if (!document.querySelector('#app-input-inn').value || !document.querySelector('#app-input-limit').value
        || (args[0] == null))
      {
        document.querySelector('#app-button-request').classList.add('btn-disabled');
      } else {
        document.querySelector('#app-button-request').classList.remove('btn-disabled');
      }

    }
  }
  
  //функция для проверки maxDate (startDate)
  const checkMaxDateField = function() {  
    let maxInput = today;
    if (endDate) {
      (startDate > endDate) ? maxInput = startDate : maxInput = endDate
    }
    return maxInput;   
  }

  let star = "";
  if (required) {
    star = `\u00a0*`;
  }

  return (
    <>
      <label className="select-label">
        {label}
        {star}
      </label>
      <DatePicker
        className="select range"
        locale="ru"
        dateFormat="dd.MM.YYYY"
        selected={startDate}
        selectsStart
        startDate={startDate}
        maxDate={checkMaxDateField()}
        id="app-range-start"
        content="range-start"
        onChange={checkRequiredFields((date) => setStartDate(date))}
        required
      />
      <DatePicker
        className="select range"
        locale="ru"
        dateFormat="dd.MM.YYYY"
        selected={endDate}
        selectsEnd
        endDate={endDate}
        minDate={startDate}
        maxDate={today}
        id="app-range-end"
        content="range-end"
        onChange={checkRequiredFields((date) => setEndDate(date))}
        required
      />
      <p className="input-errorText error-range hidden" id="app-range-error">
        Введите корректные данные
      </p>
    </>
  );
}

export default Range;
