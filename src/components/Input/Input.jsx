import "./Input.css";

function Input({ type, style, placeholder, label, required }) {
  let styles = `input-default`;
  if (style) {
    styles = `input-default ` + style;
  }
  let star = "";
  if (required) {
    star = `\u00a0*`;
  }

  let errorText = "";
  switch (label) {
    case "ИНН компании":
      errorText = "Введите корректные данные";
      break;
    case "Количество документов в выдаче":
      errorText = "Обязательное поле";
      break;
    default:
      break;
  }

  return (
    <>
      <label className="input-default-label">
        {label}
        {star}
      </label>
      <input type={type} className={styles} placeholder={placeholder} />
      <p className="input-errorText hidden">{errorText}</p>
    </>
  );
}

export default Input;
