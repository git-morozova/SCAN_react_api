import "./Document.css";
import Button from "@/components/Button/Button";
import { Link } from "react-router-dom";

import XMLParser from 'react-xml-parser';

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

    let rawText = item.content.markup

    //убираем лишние теги
    rawText = rawText.replace(/<entity.*?>/ig,'')
    rawText = rawText.replace(/<\/entity>/ig,'')
    rawText = rawText.replace(/<speech.*?>/ig,'')
    rawText = rawText.replace(/<\/speech>/ig,'')

    let image = [];

    //начало парсера
    try {
      //считаем количество текстовых нод в статье 
      let xmlCountNodes = new XMLParser().parseFromString(item.content.markup,"text/xml").getElementsByTagName("sentence")
      
      // в этот массив будем отбирать и добавлять предложения по тегу sentence
      let text = [];   
  
      for (let i = 0; i < xmlCountNodes.length; i++) { 
        let xml = new XMLParser().parseFromString(rawText,"text/xml").getElementsByTagName("sentence")[i]; 

        //функция замыкания
        function parseString (xmlRaw) {
          if(xmlRaw == undefined) {
            return
          } else {
            if(!xmlRaw.value) {            
              xml = xmlRaw.children[i]
              return parseString (xml)
            } else {
              //приведем строку в нужный вид
              xml = String(xml.value);            
              xml = xml.replace(/&lt;/g, '<') //переделываем спецсимволы в < и >
              xml = xml.replace(/&gt;/g, '>') 

              //убираем лишние теги - все нельзя, чтобы оставить абзацы
              xml = xml.replace(/<blockquote.*?>/ig,'') 
              xml = xml.replace(/<\/blockquote>/ig,'') 
              xml = xml.replace(/<body.*?>/ig,'') 
              xml = xml.replace(/<\/body>/ig,'')
              xml = xml.replace(/<b.*?>/ig,'')
              xml = xml.replace(/<\/b>/ig,'')
              xml = xml.replace(/<em.*?>/ig,'')
              xml = xml.replace(/<\/em>/ig,'')
              xml = xml.replace(/<i.*?>/ig,'')
              xml = xml.replace(/<\/i>/ig,'')
              xml = xml.replace(/<strong.*?>/ig,'')
              xml = xml.replace(/<\/strong>/ig,'')
              xml = xml.replace(/<span.*?>/ig,'')
              xml = xml.replace(/<\/span>/ig,'')
              xml = xml.replace(/<div.*?>/ig,'')
              xml = xml.replace(/<\/div>/ig,'')
              xml = xml.replace(/<data.*?>/ig,'')
              xml = xml.replace(/<\/data>/ig,'')
              xml = xml.replace(/<a.*?>/ig,'')
              xml = xml.replace(/<\/a>/ig,'')
              xml = xml.replace(/<index.*?>/ig,'')
              xml = xml.replace(/<\/index>/ig,'')
              xml = xml.replace(/<small.*?>/ig,'')
              xml = xml.replace(/<\/small>/ig,'')
              xml = xml.replace(/<article.*?>/ig,'')
              xml = xml.replace(/<\/article>/ig,'')
              xml = xml.replace(/<ul.*?>/ig,'')
              xml = xml.replace(/<\/ul>/ig,'')
              xml = xml.replace(/<hr.*?>/ig,'')
              xml = xml.replace(/<li.*?>/ig,'')
              xml = xml.replace(/<header.*?>/ig,'')
              xml = xml.replace(/<\/header>/ig,'')
              xml = xml.replace(/&amp;/ig,'&') 
              xml = xml.replace(/<font.*?>/ig,'')
              xml = xml.replace(/<\/font>/ig,'')              

              //тут только закрывающие
              xml = xml.replace(/<\/p>/ig,'')
              xml = xml.replace(/<\/h1>/ig,'')
              xml = xml.replace(/<\/h2>/ig,'')
              xml = xml.replace(/<\/h3>/ig,'')
              xml = xml.replace(/<\/h4>/ig,'')

              //вместо открывающего тега <p> пишем br, чтобы потом разделить абзацы
              xml = xml.replace(/<p.*?>/ig,'<br>')    
              xml = xml.replace(/<h1.*?>/ig,'<br>') 
              xml = xml.replace(/<h2.*?>/ig,'<br>') 
              xml = xml.replace(/<h3.*?>/ig,'<br>') 
              xml = xml.replace(/<h4.*?>/ig,'<br>') 
              xml = xml.replace(/<\/li>/ig,'<br>')           

              //добавляем получившуюся строку в конец массива
              text.push(xml + " ");

              //найдем картинку и запишем ее урл, если есть   

              let imageRaw = xml.split(" ").find(word => word.endsWith(`jpeg"`));
              if(imageRaw == "") {imageRaw = xml.split(" ").find(word => word.endsWith(`jpg"`))}
              if(imageRaw == "") {imageRaw = xml.split(" ").find(word => word.endsWith(`png"`))}
              if(imageRaw == "") {imageRaw = ""}

              if(imageRaw !== ""){image.push(imageRaw)}
            }
          }       
        }
        parseString(xml)
      }
      
      //объединим элементы массива в единый элемент, если нет тега <br>
      text = text.join("")
      text = text.split('<br> ')      
      
      docsResultArray.push({
        "id": key, 
        "date": issueDate, 
        "source": source, 
        "image": image,
        "title": title, 
        "badge": attribute, 
        "count": wordCount, 
        "link": url, 
        "text": text 
      })
    } catch (e) {
      console.error("Произошла ошибка парсинга", e); 
    }
  }   
  //конец парсера

  return (
    <div className="flex documents flex-btw">
      
      {docsResultArray.map((item) => {
        
        //оборачиваем абзацы в p
        let text = [];
        item.text.forEach((p, index) => {
          //убираем нужные до этого теги          
          p = p.replace(/<br.*?>/ig,'')
          p = p.replace(/<sentence.*?>/ig,'')
          p = p.replace(/<\/sentence>/ig,'')          
          p = p.replace(/<source.*?>/ig,'')
          p = p.replace(/<\/source>/ig,'')            
          p = p.replace(/<picture.*?>/ig,'')
          p = p.replace(/<\/picture>/ig,'')
          text.push(
            <p key={index} className="documents__p">              
              {p}
            </p>
          );                    
        });  

        //приводим ссылку на картинку в нормальный вид
        let imageLink = item.image.filter(e => e); 
        item.image = imageLink[0]
        
        function detectURLs(message) {
          if(!message) return;
          var urlRegex = /(((https?:\/\/)|(www\.))[^\s]+)/g;
          return message.match(urlRegex)
        }
        imageLink = detectURLs(item.image)

        if(imageLink){
          imageLink = imageLink[0].slice(0, -1);
          item.image = imageLink
        }        
        

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

            {item.image ? <img
              src={item.image} 
              alt="article"
              className="stretch documents__img"
            /> : ""}   
            

            <div className="documents__text grey">{text}</div>

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
