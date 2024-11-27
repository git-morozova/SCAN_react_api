import "./Tariff.css";
import _items from "./items";
import Button from "@/components/Button/Button";
import check from "@img/icons/check.svg";

import { Context } from "@/app";
import { useContext } from "react";


const Tariff = () => {
  const { store } = useContext(Context);

  return (
    <div className="flex tariffs flex-btw">
      {_items.map((item) => {
        let button = (
          <Button type="tariff" label="Подробнее" style="tariffs__btn" />
        );
        let border;
        let badge = <hr className="tariffs__inactive" />;

        if (item.tariff == store.tariff) {
          border = `2px solid ` + item.color;
          badge = <div className="tariffs__current">Текущий тариф</div>;
          button = (
            <Button
              type="tariff"
              label="Перейти в личный кабинет"
              style="tariffs__btn btn-grey"
            />
          );
        }

        let list = [];
        item.info_list.forEach((item, index) => {
          list.push(
            <li className="flex tariffs__li" key={index}>
              <img src={check} className="li__img" alt="check" />
              <p>{item}</p>
            </li>
          );
        });

        return (
          <div
            className="tariffs__card"
            style={{ border: `${border}` }}
            key={item.id}
          >
            <div
              className="tariffs__top"
              style={{
                backgroundColor: `${item.color}`,
                backgroundImage: `url("${item.image}")`,
                color: `${item.colorHeader}`,
              }}
            >
              <h3>{item.tariff}</h3>
              <p>{item.desc}</p>
            </div>
            {badge}
            <div className="tariffs__middle">
              <div className="flex tariffs__prices">
                <p className="tariffs__prices-actual">{item.price} ₽</p>
                <p className="tariffs__prices-grey">{item.price_strike} ₽</p>
              </div>
              <p className="tariffs__installment">{item.installment_info}</p>
            </div>
            <div className="tariffs__bottom">
              <h4>В тариф входит:</h4>
              <ul className="tariffs__ul">{list}</ul>
            </div>
            {button}
          </div>
        );
      })}
    </div>
  );
};

export default Tariff;
