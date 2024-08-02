import Dropdown from "./Dropdown";
import { useState, useEffect } from "react";
import staticData from "../utils/staticData";

const WorkoutInfo = ({
  title,
  accessories,
  movements, 
  movementObj, 
  sets,
  showDropdown,
  changeDropdowns,
  updateSets,
  removeMovement,
  addMovement,
  moveUp,
  moveDown,
  changeMovement,
}) => {

  const movementInfo = staticData.movements;
  const movement = movementObj.movement;
  const lowerRep = movementObj.lowerRep;
  const upperRep = movementObj.upperRep;

  const getSubOptions = (text, movement) => {
    let group = movement === 'new movement'? '': movementInfo[movement].primary;

    let options = [];
    for (let name in movementInfo) {
      if (!movements.some(entry => entry.movement === name) && (title.includes(movementInfo[name].primary) || accessories.includes(movementInfo[name].primary) && name.includes(text))){
        options.push(name)
      }
    }

    return options;
  }

  const handleChange = (e) => {
    setSubText(e.target.value.toLowerCase());
    setSubOptions(getSubOptions(e.target.value, movement));
  }

  const handleBlur = () => {
    setTimeout(() => {
      setShowSubs(false);
    }, 100);
  }

  const group = movement === "new movement"? '': movementInfo[movement].primary;
  const bias = movement === "new movement"? 'neutral': movementObj.bias;
  const tags = [];
  if (group !== ''){
    tags.push(group);
  }
  if (bias !== 'n' && movement !== 'new movement') {
    let regionNotes = movementInfo[movement].variants[bias];

    if (regionNotes.length > 0){
      tags.push(regionNotes);
    }

    let regionText = ''; 
    if (group === 'chest' && bias === 'u') {
      regionText = 'upper chest';
    }   
    if (group === 'chest' && bias === 'l') {
      regionText = 'lower chest';
    }   
    if (group === 'back' && bias === 'u') {
      regionText = 'upper back';
    }   
    if (group === 'back' && bias === 'l') {
      regionText = 'lats';
    }   
    if (group === 'legs' && bias === 'q') {
      regionText = 'quads';
    }   
    if (group === 'legs' && bias === 'h') {
      regionText = 'hamstrings';
    }   
    tags.push(regionText);
  }

  let icon = showDropdown? "-": "+";
  let iconClass = showDropdown? "close-button": "expand-button";

  const [subOptions, setSubOptions] = useState(getSubOptions('', movement));
  const [showSubs, setShowSubs] = useState(false);
  const [subText, setSubText] = useState(movement);
  useEffect(() => {
    setSubText(movement);
  }, [movement]);
  useEffect(() => (setSubOptions(getSubOptions('', movement))), [movement]);

  return (
    <>
    <div className="lift-container">
      <button className={iconClass} onClick={() => changeDropdowns(movement)}>
        {icon}
      </button>
      <div className="flexbox-row">
        <div style={{width: '78%'}}>
            <input type="text" value={subText} onClick={() => setShowSubs(true)} onChange={handleChange}     onBlur={handleBlur} className="movement-title">
            </input>
        </div>
        <div style={{fontSize: '12px', marginTop: '8px', paddingLeft: '10px'}}>
          {lowerRep} - {upperRep} reps
        </div>
      </div>
      <div id="sub-dropdown" style={{display: showSubs === false? 'none': 'grid'}}>
        {subOptions.map((option) => (
          <button id="sub-option" onClick={() => changeMovement(option, movementObj, setShowSubs, setSubText)}>
            {option}
          </button>
        ))}
      </div>

      <div></div>
      <div className="tag-box">
        {tags.map((tag, index) => (
          <div key={index} className="tag">
            {tag}
          </div>
        ))}
      </div>
      <div></div>
      <Dropdown
        show={showDropdown}
        sets={sets}
        reps={lowerRep + "-" + upperRep}
        updateSets={updateSets}
        movement={movement}
      />
    </div>
    <div className="center-div">
      <div className="slant-button-grid" id="edit-button-grid">
        <button id="edit-button" onClick={() => addMovement(movement)}>+</button>
        <button id="edit-button" onClick={() => removeMovement(movement)}>-</button>
        <button id="edit-button" onClick={() => moveUp(movement)}>
          <img src="/media/footer-icons/up-icon.png" style={{width: '20px'}}></img>
        </button>
        <button id="edit-button" onClick={() => moveDown(movement)}>
        <img src="media/footer-icons/down-icon.png" style={{width: '20px'}}></img>
        </button>
      </div>
    </div>
    <div className="center-div">
      <div id="edit-line">.</div>
    </div>
    </>
  );
};

export default WorkoutInfo;
