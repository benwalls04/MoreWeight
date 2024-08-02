import React, { useState } from 'react';
import ErrorText from './ErrorText';

const Dropdown = ({
  sets,
  show,
  updateSets, 
  movement,
}) => {

  const [errorText, setErrorText] = useState("Please enter a valid number.");
  const [showError, setShowError] = useState(false);
  
  function validChange(val, field) {
    if (isNaN(val)) {
      return false;
    }
    if (field === 'RPE') {
      if (val < 7 || val > 11) {
        setErrorText("Please enter a number between 7 and 11.");
        return false;
      }
    } else {
      if (val < 1 || val > 5) {
        setErrorText("Please enter a number between 1 and 5.");
        return false;
      }
    }
    return true;
  }

  const handleBlur = (event, setIndex, field) => {
    let updatedSets = { ...sets[setIndex]};
    const newVal = field === 'RPE'? parseInt(event.target.innerText) : parseFloat(event.target.innerText);
    if (!validChange(newVal, field)){
      setShowError(true);
    } else {
      updatedSets[field] = newVal;
      setShowError(false);
      updateSets(updatedSets, setIndex, movement);
    } 
  };

  if (show) {
    return (
      <>
        <div className="expand-container">
          <div className="sets-grid">
            <div>Set</div>
            <div>RPE</div>
            <div>Rest</div>
            {sets.map((set, setIndex) => (
              <React.Fragment key={setIndex}>
              <div>
                {setIndex + 1}
              </div>
              <div
                contentEditable
                suppressContentEditableWarning
                onBlur={(e) => handleBlur(e, setIndex, 'RPE')}
              >
                {set.RPE}
              </div>
              <div
                contentEditable
                suppressContentEditableWarning
                onBlur={(e) => handleBlur(e, setIndex, 'rest')}
              >
                {set.rest}
              </div>
            </React.Fragment>  
            ))}
          </div>
          <div></div>
          <ErrorText show={showError} text={errorText}></ErrorText>
        </div>
      </>
    );
  } else {
    return <></>;
  }
};

/*
        <ul className="expand-text">
          {lines.map((line: String) => (
            <li>{line}</li>
          ))}
        </ul>

        <img className="image" src={imageLink}></img>
 */

/*
function getLines(notes: String) {
  let noteLines = [];
  let index = 0;
  while (index < notes.length) {
    let line = "";
    while (index < notes.length && notes.charAt(index) != ">") {
      line += notes.charAt(index);
      index++;
    }
    noteLines.push(line);
    index++;
  }

  return noteLines;
}
*/

export default Dropdown;
