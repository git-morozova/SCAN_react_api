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
      
    }
  };


  

  return (    
    <button type="button" onClick={submitFunction} className={styles}>
      {label}
    </button>
  );
}

export default Button;
