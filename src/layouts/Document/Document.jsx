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

    
 


    //Парсер текста статьи

    let text = [];

    //считаем количество текстовых нод в статье 
    let xmlCountNodes = new XMLParser().parseFromString(item.content.markup,"text/xml").getElementsByTagName("sentence")

    for (let i = 0; i < xmlCountNodes.length; i++) {    
      let xml = new XMLParser().parseFromString(item.content.markup,"text/xml").getElementsByTagName("sentence")[i]; 
      console.log(xml);



      //функция замыкания
      function parseString (xmlRaw) {
        if(xmlRaw == undefined) {
          return
        } else {
          if(!xmlRaw.value) {            
            xml = xmlRaw.children[i]
            return parseString (xml)
          }      else {
            xml = String(xml.value);
            xml = xml.replace(/<[^>]*>/g, '') //убираем лишние теги
            text.push(xml);
          }
        }        
      }
      parseString(xml)

    }


/*
  <?xml version="1.0" encoding="utf-8"?>
  <scandoc>
    <sentence>
      <speech author-local-id="1">
        <speech author-local-id="5">
          <speech author-local-id="6">
            По всей <entity type="location" local-id="29">России </entity>температура в декабре 
            ожидается около или выше нормы</speech></speech></speech>, заявил научный руководитель 
            <entity type="company" local-id="5">Гидрометцентра РФ </entity>
            <entity type="person" local-id="1">Роман Вильфанд</entity>. 
            </sentence>
            <sentence>По <entity type="person" local-id="1">его </entity>словам, 
            <speech author-local-id="1"><speech author-local-id="5">
              <speech author-local-id="6">нет ни одного региона, где в следующем месяце температура
                 прогнозировалась бы ниже нормальной.</speech></speech></speech> </sentence>
                 <sentence>Синоптик подробно рассказал, где в декабре будет теплее обычного, 
                  а также поделился детальным прогнозом по количеству осадков.
                  &lt;/div&gt;&lt;div&gt;&lt;p&gt;</sentence>
                  <sentence>
                    <entity type="theme" local-id="19">Во всех <entity type="location" local-id="29">
                      российских </entity>регионах температура воздуха в декабре ожидается около 
                      или выше нормы. </entity></sentence>
                      <sentence><entity type="theme" local-id="24">
                        Подробный прогноз погоды на первый зимний месяц сделал научный руководитель <entity type="company" local-id="6">Гидрометцентра России </entity><entity type="person" local-id="1">Роман Вильфанд </entity>в беседе с <entity type="company" local-id="3">агентством Интерфакс</entity>.&lt;/p&gt;&lt;blockquote&gt;&lt;p&gt;</entity></sentence><sentence>"На всей территории страны в декабре нет регионов, где прогнозировался бы класс температуры ниже нормы. </sentence><sentence>Везде около и выше нормы, но при этом нечасто встречающиеся ситуации, когда на большей части территории страны температура прогнозируется выше нормы", – рассказал синоптик.&lt;/p&gt;&lt;/blockquote&gt;&lt;p&gt;</sentence><sentence>По его словам, превышение среднемесячной температуры ожидается на восточной половине европейской части <entity type="location" local-id="29">России</entity>, на востоке Северо-Западного федерального округа, востоке Центрального федерального округа, во всем Приволжском федеральном округе, на Урале, а также на большей части Сибирского федерального округа и северной половине Дальневосточного федерального округа.&lt;/p&gt;&lt;p&gt;</sentence><sentence>На оставшейся европейской части <entity type="location" local-id="29">России </entity>температура будет около нормы. </sentence><sentence>В частности, речь идет о <entity type="location" local-id="30">Москве</entity>, <entity type="location" local-id="31">Санкт-Петербурге</entity>, Центральном Черноземье и юге Европейской <entity type="location" local-id="29">России </entity>– Северо-Кавказском и Южном федеральных округах.&lt;/p&gt;&lt;p&gt;</sentence><sentence>Кроме того, близкая к норме температура в декабре прогнозируется на юге и юго-востоке Сибири, в южной половине <entity type="location" local-id="32">Якутии</entity>, <entity type="location" local-id="33">Амурской области</entity>, на юге <entity type="location" local-id="34">Хабаровского края </entity>и в <entity type="location" local-id="35">Приморье</entity>.&lt;/p&gt;&lt;blockquote&gt;&lt;p&gt;</sentence><sentence><speech author-local-id="1"><speech author-local-id="5"><speech author-local-id="6">"Это связано с тем, что прогнозируется частое вторжение (воздушных масс с. – &lt;em&gt;RT&lt;/em&gt;) Атлантики в азиатскую часть страны, что редко бывает"</speech></speech></speech>, – объяснил <entity type="person" local-id="1">Вильфанд</entity>.&lt;/p&gt;&lt;/blockquote&gt;&lt;p&gt;</sentence><sentence><entity type="theme" local-id="11"><entity type="theme" local-id="12"><entity type="theme" local-id="13"><entity type="theme" local-id="14"><entity type="theme" local-id="15"><entity type="theme" local-id="16"><entity type="theme" local-id="17">Согласно прогнозу синоптика, на европейской территории страны в большинстве регионов выпадет нормальное количество осадков, однако на юге Центрального федерального округа, в <entity type="location" local-id="37">Рязанской</entity>, <entity type="location" local-id="38">Воронежской</entity>, <entity type="location" local-id="39">Тульской</entity>, <entity type="location" local-id="40">Липецкой </entity>и <entity type="location" local-id="36">Тамбовской областях </entity>будет наблюдаться их дефицит. </entity></entity></entity></entity></entity></entity></entity></sentence><sentence><entity type="theme" local-id="18">Недостаток снега также ожидается в северной половине <entity type="location" local-id="32">Якутии</entity>.&lt;/p&gt;&lt;p&gt;</entity></sentence><sentence>В то же время избыток осадков в декабре прогнозируется в <entity type="location" local-id="41">Ненецком автономном округе</entity>, в <entity type="location" local-id="43">Архангельской </entity>и <entity type="location" local-id="42">Мурманской областях</entity>, <entity type="location" local-id="44">Республике Коми</entity>, а также в северной половине Уральского федерального округа, в <entity type="location" local-id="45">Пермском крае</entity>, <entity type="location" local-id="47">Ямало-Ненецком </entity>и <entity type="location" local-id="46">Ханты-Мансийском автономных округах</entity>.&lt;/p&gt;&lt;p&gt;</sentence><sentence>Кроме того, снегом завалит юго-восток Сибири, в том числе <entity type="location" local-id="48">Красноярский край</entity>, <entity type="location" local-id="49">Иркутскую область </entity>и <entity type="location" local-id="50">Туву</entity>, а также Дальний Восток – <entity type="location" local-id="51">Бурятию</entity>, Чукотку, <entity type="location" local-id="52">Магаданскую область </entity>и <entity type="location" local-id="35">Приморский край</entity>.&lt;/p&gt;&lt;p&gt;</sentence><sentence><entity type="theme" local-id="25">Между тем специалист <entity type="company" local-id="4">информационного агентства "Метеоновости" </entity><entity type="person" local-id="2">Татьяна Позднякова </entity>в беседе с RT рассказала о погоде в столице в предстоящие выходные. </entity></sentence><sentence><entity type="theme" local-id="26">По <entity type="person" local-id="2">ее </entity>словам, 30 ноября и 1 декабря погоду будет определять гребень антициклона с запада.&lt;/p&gt;&lt;p&gt;</entity></sentence><sentence><speech author-local-id="2"><speech author-local-id="4">"Существенных осадков у нас не ожидается. </speech><sentence>Днем мы рассчитываем, что будут появляться просветы. </sentence><sentence>В ночные часы у нас температура слабо отрицательная, где-то до -1...-3 °C, а дневная температура останется около нуля. </sentence><sentence><entity type="theme" local-id="27">То есть погода, в принципе, довольно комфортная"</entity></sentence>, – отметила <entity type="person" local-id="2">Позднякова</entity>.&lt;/p&gt;&lt;p&gt;</speech></sentence><sentence><entity type="person" local-id="2">Она </entity>предупредила, что <speech author-local-id="2"><speech author-local-id="4">местами в <entity type="location" local-id="30">Москве </entity>будет формироваться гололедица – там, где будет подтаивать, а потом замерзать недавно выпавший снег.</speech></speech>&lt;/p&gt; &lt;p&gt;</sentence><sentence><entity type="theme" local-id="22">В начале декабря положительная температурная аномалия на территории Московского региона сохранится, утверждает синоптик.&lt;/p&gt;&lt;p&gt;</entity></sentence><sentence><entity type="theme" local-id="28">"На следующей неделе у нас сохранится теплая погода с аномалией температуры выше нормы на 3-4 °C. </entity></sentence><sentence>Также около нуля в дневные часы и слабо отрицательная температура ночью. </sentence><sentence>И осадки наиболее вероятны в конце первой пятидневки. </sentence><sentence>Пока (предварительный прогноз. – &lt;em&gt;RT&lt;/em&gt;) на 4-5 декабря – небольшой снег. </sentence><sentence>А уже затем ожидается понижение температуры. </sentence><sentence>То есть, скорее всего, вторая пятидневка в декабре будет уже с легким морозом и в ночное, и в дневное время", – заключила собеседница RT.&lt;/p&gt;&lt;p&gt;</sentence><sentence><entity type="theme" local-id="23"><speech author-local-id="0"><speech author-local-id="5"><speech author-local-id="6">Ранее о положительной погодной аномалии RT также рассказал замначальника <entity type="company" local-id="6"><entity type="company" local-id="7">ситуационного центра Гидрометцентра России </entity></entity><entity type="person" local-id="0">Анатолий Цыганков</entity>.</speech></speech></speech> &lt;/p&gt;&lt;p&gt;</entity></sentence><sentence><entity type="theme" local-id="20"><entity type="theme" local-id="21">Между тем сообщалось, что метеорологи <entity type="location" local-id="47">Ямало-Ненецкого автономного округа </entity>зафиксировали новый температурный рекорд в <entity type="location" local-id="53">Салехарде </entity>– впервые за 142 года метеонаблюдений столбики термометров 27 ноября показали +2,9 °С.&lt;/p&gt;&lt;/div&gt;&lt;/body&gt; &lt;/data&gt; </entity></entity></sentence></scandoc>

*/

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
