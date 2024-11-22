import "./Document.css";
import _items from "./items";
import Button from "@/components/Button/Button";

const Document = () => {
  return (
    <div className="flex documents flex-btw">
      {_items.map((item) => {
        let text = [];
        item.text.forEach((item, index) => {
          text.push(
            <p key={index} className="documents__p">
              {item}
            </p>
          );
        });

        return (
          <div className="documents__card" key={item.id}>
            <div className="flex documents__text grey">
              <span>{item.date}</span>
              <span>{item.source}</span>
            </div>

            <h3 className="documents__title">{item.title}</h3>
            <div>
              <p className="documents__badge">{item.badge}</p>
            </div>
            <img
              src={item.image}
              alt="article"
              className="stretch documents__img"
            />

            <div className="documents__text grey">{text}</div>

            <div className="flex documents__bottom">
              <Button
                type="documents"
                label="Читать в источнике"
                style="documents__btn"
                link="{item.link}"
              />
              <div className="documents__count grey">{item.count}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Document;
