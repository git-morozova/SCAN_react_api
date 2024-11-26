import "./UserVidget.css";
import Button from "@/components/Button/Button";
import authLine from "@img/icons/auth_line.svg";
import spinner from "@img/icons/spinner.png";
import avatar from "@img/avatar.png";
import { Link } from "react-router-dom";

import { Context } from "@/app";
import { useContext } from "react";

function UserVidget() {
  const { store } = useContext(Context);

  if (!store.checkAuth()) {
    return (
      <>
        <div id="app-header-auth" className="auth flex">
          <div className="auth__reg">
            <a className="grey" href="/">
              Зарегистрироваться
            </a>
          </div>
          <img src={authLine} className="auth__line" alt="|" />
          <div className="auth__btn">
            <Link to="/auth">
              <Button type="auth" label="Войти" style="btn-small" />
            </Link>
          </div>
        </div>
      </>
    );
  } else {
    console.log(store.getCompanyLimitInfo())
    //console.log(store.companyLimit)
    return (
      <>
        <div id="app-header-user" className="user flex flex-btw">
          <div className="counters flex">
            {/* <img src={spinner} className="counters__img" alt="загрузка..." /> */}
            <div className="flex counters__inner">
              <div className="counters__text">Использовано компаний</div>
              <div className="counters__sum">{store.usedCompanyCount}</div>
            </div>
            <div className="flex counters__inner">
              <div className="counters__text">Лимит по компаниям</div>
              <div className="counters__sum bright">{store.companyLimit}</div>
            </div>
          </div>
          <div className="flex user-block">
            <div className="user-block__main">
              <div className="main__name">Алексей&nbsp;А.</div>
              <Button
                content="logout"
                type="button"
                label="Выйти"
                style="btn-transparent"
              />
            </div>
            <div className="user-block__avatar">
              <img src={avatar} className="avatar__img" alt="avatar" />
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default UserVidget;
