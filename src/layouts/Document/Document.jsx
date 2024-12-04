import "./Document.css";
import Button from "@/components/Button/Button";
import { Link } from "react-router-dom";

import { Context } from "@/app";
import { useContext } from "react";

const Document = () => {
  const { store } = useContext(Context);

  //собираем результат в удобный массив
  let docsResultArray = [];
  
  for (let key in store.getDocs) {    
    let item = store.getDocs[key].ok; 

    let issueDate = item.issueDate;    // 2024-11-27T18:44:09+03:00  - в статье с этой датой есть картинка   
    let formattedDate = new Date(issueDate); //Mon Jul 01 2024 03:00:00 GMT+0300 (Москва, стандартное время)
    formattedDate = formattedDate.toISOString().split('T')[0] //2024-07-01
    formattedDate = formattedDate.split("-").reverse().join("."); //01.07.2024 
    issueDate = formattedDate    

    let source = item.source.name;   
    let title = item.title.text;   

    let attribute = "";
    if (item.attributes.isTechNews) {attribute = "Технические новости"};  
    if (item.attributes.isAnnouncement) {attribute = "Анонсы и события"}; 
    if (item.attributes.isDigest) {attribute = "Сводки новостей"}; 

    let wordCount = item.attributes.wordCount; 
    let url = item.url;     

    let text = item.content.markup;

    docsResultArray.push({
      "id": key, 
      "date": issueDate, 
      "source": source, 
      "image": '../src/assets/img/results_doc2.jpg', // проверка на 0 и формат
      "title": title, 
      "badge": attribute, 
      "count": wordCount, 
      "link": url, 
      "text": text //формат
    })
  }   


  return (
    <div className="flex documents flex-btw">
      {docsResultArray.map((item) => {

        return (
          <div className="documents__card" key={item.id}>
            <div className="flex documents__text grey">
              <span>{item.date}</span>
              <span>{item.source}</span>
            </div>

            <a href={item.link} target="_blank"><h3 className="documents__title">{item.title}</h3></a>

            <div>
            {item.badge ? <p className="documents__badge">{item.badge}</p> : ""}      
            </div>
            <img
              src={item.image}
              alt="article"
              className="stretch documents__img"
            />

            <div className="documents__text grey">{item.text}</div>

            <div className="flex documents__bottom">
              <Link to={item.link} target="_blank">
                <Button
                label="Читать в источнике"
                style="documents__btn"                
              />
              </Link>              
              <div className="documents__count grey">Слов: {item.count}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Document;
