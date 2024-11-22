import "./Button.css";

function Button({ type, label, style }) {
  let styles = `btn`;
  if (style) {
    styles = `btn ` + style;
  }

  switch (type) {
    case "auth" /*console.log("auth")*/:
      break;
    case "tariff" /*console.log("tariff")*/:
      break;
    case "logout" /*console.log("logout")*/:
      break;
    default: /*console.log("default")*/
      break;
  }

  return <button className={styles}>{label}</button>;
}

export default Button;
