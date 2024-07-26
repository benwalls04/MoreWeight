import Dropdown from "./Dropdown";
import { useState, useEffect } from "react";


const WorkoutInfo = ({
  title,
  accessories,
  movements, 
  movement, 
  sets,
  showDropdown,
  changeDropdowns,
  updateSets,
  removeMovement,
  addMovement,
  moveUp,
  moveDown,
  changeMovement,
  liftData,
}) => {
    
  const getSubOptions = (text, movement) => {
    let region = movement === 'new movement'? 'neutral': liftData[2][movement].region;
    let group = movement === 'new movement'? '': liftData[2][movement].group;

    let options = [];
    for (let name in liftData[2]) {
      if (!movements.includes(name) && title.includes(liftData[2][name].group) && name.includes(text)){
        options.push(name)
      }
    }

    for (let name in liftData[10]){
      liftData[10][name].variants.forEach(variant => {
        if (!movements.includes(variant) && accessories.includes(liftData[10][name].primary) && name.includes(text)){
          options.push(variant);
        }
      })
    }

    let priorityOptions = []; let secondaryOptions = []; let lastOptions = [];
    options.forEach(option => {
      const variantInfo = liftData[2][option];

      if (movement in liftData[10]){
        if (option in liftData[10] && liftData[10][movement].primary === liftData[10][option].primary){
          priorityOptions.push(option);
        } else {
          lastOptions.push(option);
        }
      } else if (option in liftData[10]){
        lastOptions.push(option);
      } else {
        if (variantInfo.group === group && variantInfo.region === region){
          priorityOptions.push(option);
        } else if (variantInfo.group === group){
          secondaryOptions.push(option);
        } else {
          lastOptions.push(option);
        }
      }
    })

    options = priorityOptions.concat(secondaryOptions.concat(lastOptions));

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

  const group = movement === "new movement"? '': liftData[2][movement].group;
  const region = movement === "new movement"? 'neutral': liftData[2][movement].region;
  const tags = [];
  if (group !== ''){
    tags.push(group);
  }
  if (region !== "neutral") {
    tags.push(region);
  }

  let icon = showDropdown? "-": "+";
  let iconClass = showDropdown? "close-button": "expand-button";

  const liftType = sets[0].liftType;
  const lowerBound = liftType === 1 ? 2 : liftType === 2 ? 4 : liftType === 3 ? 6 : liftType === 4 ? 8 : 10;
  const upperBound = liftType === 1 ? 6 : liftType === 2 ? 8 : liftType === 3 ? 10 : liftType === 4 ? 12 : 14;

  const [subOptions, setSubOptions] = useState(getSubOptions('', movement));
  const [showSubs, setShowSubs] = useState(false);
  const [subText, setSubText] = useState(movement);
  useEffect(() => {
    setSubText(movement);
  }, [movement]);
  useEffect(() => (setSubOptions(getSubOptions('', movement, liftType))), [movement, liftType]);

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
          {lowerBound} - {upperBound} reps
        </div>
      </div>
      <div id="sub-dropdown" style={{display: showSubs === false? 'none': 'grid'}}>
        {subOptions.map((option) => (
          <button id="sub-option" onClick={() => changeMovement(option, movement, setShowSubs, setSubText)}>
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
        reps={lowerBound + "-" + upperBound}
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
