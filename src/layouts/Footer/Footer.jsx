import "./Footer.css";
import logo from "@img/logo_inv.png";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer id="app-footer" className="footer">
      <div className="container flex flex-btw footer__block">
        <div className="logo">
          <Link to="/">
            <img src={logo} className="logo__img" alt="СКАН" />
          </Link> 
        </div>
        <div className="footer__text flex">
          <p>
            г. Москва, Цветной б-р, 40
            <br />
            +7 495 771 21 11
            <br />
            info@skan.ru
          </p>
          <p>Copyright. 2022-2024</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
