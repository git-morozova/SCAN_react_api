import "./Range.css";

import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale } from "react-datepicker";
import { ru } from "date-fns/locale/ru";
registerLocale("ru", ru);

function Range({ label, required }) {
  let [endDate, setEndDate] = useState(new Date());

  let currentDate = new Date();
  let pastDate = currentDate.setDate(currentDate.getDate() - 30); //минус месяц
  let [startDate, setStartDate] = useState(pastDate);

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
        onChange={(date) => setStartDate(date)}
        selectsStart
        startDate={startDate}
        endDate={endDate}
      />
      <DatePicker
        className="select range"
        locale="ru"
        dateFormat="dd.MM.YYYY"
        selected={endDate}
        onChange={(date) => setEndDate(date)}
        selectsEnd
        startDate={startDate}
        endDate={endDate}
        minDate={startDate}
      />
      <p className="input-errorText error-range hidden">
        Введите корректные данные
      </p>
    </>
  );
}

export default Range;
