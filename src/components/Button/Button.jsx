import "./Button.css";
import { Context } from "@/app";
import { useContext } from "react";

function Button({ label, style, content }) {
  const { store } = useContext(Context);

  let styles = `btn`;
  if (style) {
    styles = `btn ` + style;
  }

  const submitFunction = () => {
    if (content == "login") {
      store.login(
        document.querySelector("#app-input-login").value,
        document.querySelector("#app-input-password").value
      );

    } else if (content == "logout") {
      store.logout();
      
    } else if (content == "request") {
      let limit = "24";  // (Количество документов в выдаче)

      store.request(
        { // issueDateInterval (Диапазон поиска)
          "startDate": "2024-01-01",
          "endDate": "2024-09-01"
        },
        { // searchContext
          "targetSearchEntitiesContext": {
            "targetSearchEntities": [
              {
                "type": "company", //фикс значение
                "inn": 7710137066, // ИНН компании
                "maxFullness": true, // Признак максимальной полноты
                "inBusinessNews": null // Упоминания в бизнес-контексте
              }
            ],
            "onlyMainRole": true, // Главная роль в публикации
            "tonality": "any", // Тональность
            "onlyWithRiskFactors": false, // Публикации только с риск-факторами
          },       
        },
       "month", //фикс значение intervalType
       ["totalDocuments","riskFactors"], // фикс значение histogramTypes
       limit,
       "duplicates", //фикс значение similarMode
       "sourceInfluence", //фикс значение sortType
       "desc", //фикс значение sortDirectionType

       { // attributeFilters
        "excludeTechNews": true, // excludeTechNews (Включать технические новости рынков)
        "excludeAnnouncements": true, // excludeAnnouncements (Включать анонсы и календари)
        "excludeDigests": true // excludeDigests (Включать сводки новостей)
       }       
      );      
    }
  };

  return (    
    <button type="button" onClick={submitFunction} className={styles}>
      {label}
    </button>
  );
}

export default Button;
