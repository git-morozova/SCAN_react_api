import "./Button.css";
import { Context } from "@/app";
import { useContext } from "react";
import validateInn from "@/features/validateInn";
import { useState, useEffect } from 'react';

function Button({ label, style, content }) {
  const { store } = useContext(Context);
  
  let styles = `btn`;
  if (style) {
    styles = `btn ` + style;
  }

  let id;
  if (content) {    
    id = `app-button-` + content;
  }

  const submitFunction = () => {
    
    if (content == "login") {
      //обнуляем ошибки 
      document.querySelector("#app-input-login-error").classList.add('hidden');
      document.querySelector("#app-input-password-error").classList.add('hidden');
      document.querySelector("#app-input-login").classList.remove('input-error');
      document.querySelector("#app-input-password").classList.remove('input-error');

      let login = document.querySelector("#app-input-login").value;  
      let password = document.querySelector("#app-input-password").value;  

      //валидация полей
      if (!login) {
        document.querySelector("#app-input-login-error").classList.remove('hidden');
        document.querySelector("#app-input-login").classList.add('input-error');
      } else if (!password) { 
        document.querySelector("#app-input-password-error").classList.remove('hidden');
        document.querySelector("#app-input-password").classList.add('input-error');
      } else {
      //validation success      
      store.login(login, password);
      }

    } else if (content == "logout") {
      store.logout();
      
    } else if (content == "request") {  

      //обнуляем ошибки      
      document.querySelector("#app-input-limit-error").classList.add('hidden');
      document.querySelector("#app-input-inn-error").classList.add('hidden');
      document.querySelector("#app-range-error").classList.add('hidden');
      document.querySelector("#app-input-inn")?.classList.remove('input-error');
      document.querySelector("#app-input-limit")?.classList.remove('input-error');
      document.querySelector("#app-range-start")?.classList.remove('input-error');
      document.querySelector("#app-range-end")?.classList.remove('input-error');

      //вытаскиваем значения из формы
      let limit = document.querySelector("#app-input-limit").value;  // (Количество документов в выдаче) 20
      let inn = document.querySelector("#app-input-inn").value;  // (ИНН компании) 7710137066
      let tonality = document.querySelector("#app-select-tone").value;  // (Тональность) any
      
      let maxFullness = document.querySelector("#app-search_max").checked;  // (Признак максимальной полноты) true      
      let inBusinessNews = document.querySelector("#app-search_business").checked;  // (Упоминания в бизнес-контексте) false true null      
      let onlyMainRole = document.querySelector("#app-search_headliner").checked;  // (Главная роль в публикации) true      
      let onlyWithRiskFactors = document.querySelector("#app-search_risk").checked;  // (Публикации только с риск-факторами) false
      let excludeTechNews = document.querySelector("#app-search_tech").checked;  // (Включать технические новости рынков) true
      let excludeAnnouncements = document.querySelector("#app-search_anons").checked;  // (Включать анонсы и календари) true
      let excludeDigests = document.querySelector("#app-search_news").checked;  // (Включать сводки новостей) true

      let startDate = document.querySelector("#app-range-start").value;
      let endDate = document.querySelector("#app-range-end").value;
      
      //вспомогательные операции со значениями из формы
      let validateInnResult = validateInn(inn);

      startDate = startDate.split('.');
      startDate = startDate[2] + '-' + startDate[1] + '-' + startDate[0]; // 2024-01-01
      endDate = endDate.split('.');
      endDate = endDate[2] + '-' + endDate[1] + '-' + endDate[0]; // 2024-01-01

      switch (tonality) {
        case "Любая": tonality = "any"
        break
        case "Негативная": tonality = "negative"
        break
        case "Позитивная": tonality = "positive"
        break
      }

      //валидация полей
      if (!inn || !validateInnResult) {
        document.querySelector("#app-input-inn-error").classList.remove('hidden');
        document.querySelector("#app-input-inn").classList.add('input-error');
      } else if (!limit || limit < 1 || limit > 1000 || isNaN(limit)) { 
        document.querySelector("#app-input-limit-error").classList.remove('hidden');
        document.querySelector("#app-input-limit").classList.add('input-error');
      } else if (document.querySelector("#app-range-start").value == "" || document.querySelector("#app-range-end").value == "") {
        document.querySelector("#app-range-error").classList.remove('hidden');
        document.querySelector("#app-range-start").classList.add('input-error');
        document.querySelector("#app-range-end").classList.add('input-error');

      //validation success
      } else {        
        store.request(
          { // issueDateInterval (Диапазон поиска)
            "startDate": startDate,
            "endDate": endDate
          },
          { // searchContext
            "targetSearchEntitiesContext": {
              "targetSearchEntities": [
                {
                  "type": "company", //фикс значение
                  "inn": inn,
                  "maxFullness": maxFullness,
                  "inBusinessNews": inBusinessNews
                }
              ],
              "onlyMainRole": onlyMainRole,
              "tonality": tonality,
              "onlyWithRiskFactors": onlyWithRiskFactors,
            },       
          },
        "month", //фикс значение intervalType
        ["totalDocuments","riskFactors"], // фикс значение histogramTypes
        limit,
        "duplicates", //фикс значение similarMode
        "sourceInfluence", //фикс значение sortType
        "desc", //фикс значение sortDirectionType

        { // attributeFilters
          "excludeTechNews": excludeTechNews,
          "excludeAnnouncements": excludeAnnouncements,
          "excludeDigests": excludeDigests
        }       
        );          
      }    
    }
  };

  return (    
    <button type="button" onClick={submitFunction} className={styles} id={id}>
      {label}
    </button>
  );
}

export default Button;
