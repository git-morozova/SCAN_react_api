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

  let today = new Date(); //для валидации endDate




  //decorator 
  const checkRequiredFields = function(fn) {
    return function(...args) {
      if (!document.querySelector('#app-input-inn').value && !document.querySelector('#app-input-limit').value
        && (document.querySelector('#app-range-start').value == "") && (document.querySelector('#app-range-end').value == "")) {
          console.log("null")
        }
        return fn(...args);
    }
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
        onChange={checkRequiredFields((date) => setStartDate(date))}
        selectsStart
        startDate={startDate}
        maxDate={endDate}
        id="app-range-start"
        content="range-start"
        required
      />
      <DatePicker
        className="select range"
        locale="ru"
        dateFormat="dd.MM.YYYY"
        selected={endDate}
        onChange={checkRequiredFields((date) => setEndDate(date))}
        selectsEnd
        endDate={endDate}
        minDate={startDate}
        maxDate={today}
        id="app-range-end"
        content="range-end"
        required
      />
      <p className="input-errorText error-range hidden" id="app-range-error">
        Введите корректные данные
      </p>
    </>
  );
}

export default Range;
