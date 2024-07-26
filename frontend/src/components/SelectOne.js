import { useState } from 'react';

function SelectOne( {options, setChoice, id, setShow} ) {
  const [classes, setClasses] = useState(new Array(options.length).fill("input-button"));

  const handleClick = (index) => {
    const newClasses = new Array(options.length).fill("input-button");
    newClasses[index] = "input-button-select";
    setClasses(newClasses);
    setChoice(options[index]);
    setShow(false);
  }

  return (
    <div className="button-container">
      {options.map((option, index) => (
        <button
          className={classes[options.indexOf(option)]}
          id={id !== null? id : ""}
          onClick={() => handleClick(options.indexOf(option))}
        >
          {option}
        </button>
      ))}
    </div>
  );
}

export default SelectOne;