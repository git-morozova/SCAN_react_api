import "./Input.css";

function Input({ type, style, placeholder, label }) {
  let styles;
  if (style) {
    styles = `input-default ` + style;
  }

  switch (type) {
    case "password":
      console.log("input password");
      break;
    case "text":
      console.log("input text");
      break;
    default:
      console.log("input default");
      break;
  }

  return (
    <>
      <label className="input-default-label">{label}</label>
      <input type={type} className={styles} placeholder={placeholder} />
      {/* <p className="input-errorText hidden">Введите корректные данные</p>   */}
    </>
  );
}

export default Input;
