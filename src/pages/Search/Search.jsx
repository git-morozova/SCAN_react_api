import "./Search.css";

import Header from "@/layouts/Header/Header";
import Footer from "@/layouts/Footer/Footer";
import SearchForm from "@/layouts/SearchForm/SearchForm";

import heroImage from "@img/search_hero.png";
import sheet from "@img/search_sheet.svg";
import folders from "@img/search_folders.svg";

function Search() {
  return (
    <>
      <Header />
      <main className="main">
        <div className="container">
          <div className="search__top">
            <div className="search__title">
              <h1>Найдите необходимые данные в&nbsp;пару кликов</h1>
              <p className="search__text">
                Задайте параметры поиска.
                <br />
                Чем больше заполните, тем&nbsp;точнее поиск
              </p>
            </div>
            <div className="search__icons">
              <img src={sheet} alt="sheet" className="search__img-sheet" />
              <img
                src={folders}
                alt="folders"
                className="search__img-folders"
              />
            </div>
          </div>
        </div>

        <div className="search__formBlock">
          <SearchForm />
          <img src={heroImage} alt="heroImage" className="search__img-hero" />
        </div>
      </main>
      <Footer />
    </>
  );
}

export default Search;
