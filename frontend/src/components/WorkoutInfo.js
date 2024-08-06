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
  changeBias
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

  const handleBias = (index) => {
    if (tagsSelect[index] === false){
      const newBias = tags[index];
      let newTagsSelect = new Array(tagsSelect.length).fill(false);
      newTagsSelect[index] = true;
      setTagsSelect(newTagsSelect);
      changeBias(movement, newBias);
      setBiasText(movementInfo[movement].variants[newBias]);
    }
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

  useEffect(() => {
    if (movement === "new movement"){
      setShowSubs(true);
    }
  }, [movement])

  const bias = movement === "new movement"? 'neutral': movementObj.bias;
  const initBiasText = () => {
    if (movement === "new movement"){
      return '';
    } else {
      return movementInfo[movement].variants[bias];
    }
  }
  const [biasText, setBiasText] = useState(initBiasText());
  useEffect(() => {
    setBiasText(initBiasText());
  }, [bias])

  const initTags = () => {
    let tags = [];

    if (movement !== "new movement"){
      movementInfo[movement].biasOrder.forEach(icon => {
        if (!tags.includes(icon)){
          tags.push(icon)
        }
      } )
      if (tags.length === 1 && tags[0] === 'neutral'){
        tags = [movementInfo[movement].primary];
      }
    }

    return tags
  }

  const [tags, setTags] = useState(initTags());
  useEffect(() => {
    setTags(initTags());
  }, [biasText, movement]);

  const initTagsSelect = () => { 
    if (tags.length === 1){
      return [false];
    } else {
      return tags.map(tag => tag === bias);
    }
  }
  const [tagsSelect, setTagsSelect] = useState(initTagsSelect()); 
  useEffect(() => {
    setTagsSelect(initTagsSelect());
  }, [tags]);

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
      <div></div>
      <div className="small-text-left" style={{marginBottom: '-8px', marginLeft: '4px', zIndex: '2', fontStyle:'italic'}}>{biasText}</div>
      <button className={iconClass} style={{marginBottom: '5px'}} onClick={() => changeDropdowns(movement)}>
        {icon}
      </button>
      <div className="flexbox-row">
        <div style={{width: '78%'}}>
            <input type="text" value={subText} onChange={handleChange} onClick={() => setShowSubs(true)} onBlur={handleBlur} className="movement-title">
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
          <button key={index} className={tagsSelect[index]? 'tag-select': 'tag'} onClick={() => handleBias(index)}>
            {tag}
          </button>
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
        <button id="edit-button" onClick={() => setShowSubs(true)}>
          <img src="/media/footer-icons/change-icon.png" style={{width: '20px'}}></img>
        </button>
        <button id="edit-button" onClick={() => addMovement(movement)}>+</button>
        <button id="edit-button" onClick={() => removeMovement(movement)}>-</button>
        <button id="edit-button" onClick={() => moveUp(movement)}>
          <img src="/media/footer-icons/up-icon.png" style={{width: '20px'}}></img>
        </button>
        <button id="edit-button" onClick={() => moveDown(movement)}>
          <img src="/media/footer-icons/down-icon.png" style={{width: '20px'}} ></img>
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
