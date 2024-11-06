import './Checkbox.css'

function Checkbox({label, style, placeholder, id}) {
    let styles = `checkbox-default-label`;
    if (style) {
      styles = `checkbox-default-label ` + style;
    }

  return (
    <>
      <input type="checkbox"  className="checkbox-default" placeholder={placeholder} id={id}/>      
      <label className={styles} htmlFor={id}>{label}</label>             
    </>    
  )
}

export default Checkbox