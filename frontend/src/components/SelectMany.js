import { useState } from 'react';

function SelectMany( {options, choices, setChoices} ) {
  const [classes, setClasses] = useState(new Array(options.length).fill("input-button"));

  const handleClick = (index) => {
    const newClasses = [...classes];
    newClasses[index] = newClasses[index] === "input-button" ? "input-button-select" : "input-button";
    const newChoices = [... choices];
    newChoices[index] = !newChoices[index];
    setClasses(newClasses);
    setChoices(newChoices);
  }

  return (
    <div className="button-container">
      {options.map((option, index) => (
        <button
          className={classes[options.indexOf(option)]}
          onClick={() => handleClick(options.indexOf(option))}
        >
          {option}
        </button>
      ))}
    </div>
  );
}

export default SelectMany;