import "./SearchForm.css";
import Button from "@/components/Button/Button";
import Input from "@/components/Input/Input";
import Checkbox from "@/components/Checkbox/Checkbox";
import Select from "@/components/Select/Select";

function SearchForm() {
  return (
    <form id="app-search-form" className="search__form">
      <div className="flex searchForm__block">        

        <div className="searchForm__top stretch">
            <div className="searchForm__top-left">
                <Input type="text" style="searchForm__input" placeholder="10 цифр" label="ИНН компании *"/>
                <Select style="searchForm__input" label="Тональность" id="app-select-tone"/>
                <Input type="text" style="searchForm__input" placeholder="От 1 до 1000" label="Количество документов в&nbsp;выдаче&nbsp;*"/>
            </div>
            <div className="searchForm__top-right">
                <Checkbox id="app-search_max" style="searchForm__checkbox" label="Признак максимальной полноты" />
                <Checkbox id="app-search_business" style="searchForm__checkbox" label="Упоминания в бизнес-контексте" />
                <Checkbox id="app-search_headliner" style="searchForm__checkbox" label="Главная роль в публикации" />
                <Checkbox id="app-search_risk" style="searchForm__checkbox" label="Публикации только с риск-факторами" />
                <Checkbox id="app-search_tech" style="searchForm__checkbox" label="Включать технические новости рынков" />
                <Checkbox id="app-search_anons" style="searchForm__checkbox" label="Включать анонсы и календари" />
                <Checkbox id="app-search_news" style="searchForm__checkbox" label="Включать сводки новостей" />                
            </div>
        </div>
        <div className="searchForm__bottom stretch">
          <div className="searchForm__top-left">
                <p>Диапазон поиска *</p>
                <Select style="searchForm__input" label="Тональность" id="app-select-tone"/>
                <Input type="text" style="searchForm__input" placeholder="От 1 до 1000" label="Количество документов в&nbsp;выдаче&nbsp;*"/>
          </div>
          <div className="searchForm__top-right">
            <Button
              type="request"
              label="Поиск"
              style=" searchForm__submit btn-disabled"
            />
          </div>
        </div>

      </div>
    </form>
  );
}

export default SearchForm;
