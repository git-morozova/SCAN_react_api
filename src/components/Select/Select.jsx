import "./Select.css";
import { useState } from 'react';

function Select({style, id, label}) {
    let styles = `select-default`;
    if (style) {
      styles = `select-default ` + style;
    }

    let options;
    if (id == "app-select-tone") {
      options = ['Любая', 'Негативная', 'Позитивная'];
    } 

    const [option, setOption] = useState('');

    const handleOptionChange = (e) => {
      setOption(e.target.value);
    };

  return (
    <> 
        <label className="select-default-label">{label}</label>     
        <select
          id={id}
          value={option}
          className = {styles}
          onChange={handleOptionChange}
        >
          {options.map(element => {
            return (
                <option key={element} value={element}>{element}</option>
            );
          })}
        </select>    
    </>    
  )
}

export default Select
