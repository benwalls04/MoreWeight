import { useState } from 'react';
import { useEffect } from 'react';
import { useRef } from 'react';
import staticData from '../utils/staticData';

function SubButtons({allSets, setAllSets, setNumber, index, numberOfSets, getNextSet, expIcon, movementsArr}) {

  const movementInfos = staticData.movements
  const dropdownRef = useRef(null);
  const [movement, setMovement] = useState(allSets[index].movement);
  const [movements, setMovements] = useState(allSets.map(set => set.movement));


  const updateRest = (allSets, index) => {
    if (index < allSets.length - 1){
      const set = allSets[index];
      const nextSet = index < allSets.length - 1? allSets[index + 1] : null;
      const lowerRep = set.lowerRep
      set.rest = nextSet === null || movementInfos[set.movement].primary !== movementInfos[nextSet.movement].primary ? 1 : staticData.restTimes[lowerRep / 2 - 1][set.RPE - 7];
    }
  }

  const getSubOptions = (movement) => {
    let group = movement === 'new movement'? '': movementInfos[movement].primary;

    let options = [];
    for (let name in movementInfos) {
      if (!movements.some(entry => entry.movement === name) && movementInfos[name].primary === group){
        options.push(name)
      }
    }       

    return options;
  }

  const [subOptions, setSubOptions] = useState(getSubOptions(movement));
  const [showSubs, setShowSubs] = useState(false);
  useEffect(() => (setSubOptions(getSubOptions(movement))), [movement]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowSubs(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownRef]);
  
  const handleNext = () => {
    if (id === 'sub-btn'){
      let newAllSets = [...allSets];
      const movedSets = newAllSets.slice(index, index + numberOfSets);
      newAllSets.splice(index, numberOfSets);
      newAllSets.splice(index + numberOfSets, 0, ...movedSets);
      updateRest(newAllSets, index + numberOfSets - 1);
      updateRest(newAllSets, index + numberOfSets * 2 - 1);
      setAllSets(newAllSets);
    }
  }

  const handleEnd = () => {
    if (id === 'sub-btn'){
      let newAllSets = [...allSets];
      const movedSets = newAllSets.slice(index, index + numberOfSets);
      newAllSets.splice(index, numberOfSets);
      newAllSets = newAllSets.concat(movedSets);
      updateRest(newAllSets, index + numberOfSets - 1);
      updateRest(newAllSets, newAllSets.length - (numberOfSets + 1));
      setAllSets(newAllSets);
    }
  }

  const handleSub = (option) => {
    let newAllSets = [...allSets];
    
    const RPESeq = movementInfos[option].sequences[expIcon].slice(4 - numberOfSets, 4);
    const bias = movementInfos[option].biasOrder.includes(movement.bias)? movement.bias : movementInfos[option].biasOrder.includes('n')? 'n': movementInfos[option].biasOrder[0]; 

    console.log(allSets)

    for (let i = 0; i < numberOfSets; i++){
      let set = newAllSets[index + i];
      set.bias = bias;
      set.movement = option;
      set.RPE = RPESeq[i];
      set.rest = allSets[index + i].rest <= 1? 1 : set.rest;
      set.num = i + 1;
      set.lowerRep = allSets[index + i].lowerRep;
      set.upperRep = allSets[index + i].upperRep;
      newAllSets[index + i] = set;
    }

    console.log(newAllSets)

    updateRest(newAllSets, index);
    setShowSubs(false);
    setAllSets(newAllSets);
    setMovement(option);
    
    //update movements differently 
    setMovements(movements.map(entry => {
      if (entry.movement === movement){
        return {
          movement: option, bias: bias, RPE: RPESeq, lowerRep: movement.lowerRep, upperRep: movement.upperRep, stimulus: movement.stimulus
        }
      } else {
        return entry;
      }
    }
    ));
  }

  const id = setNumber === 1 ? 'sub-btn' : 'sub-btn-restrict';

  return (
    <>
    <div className="center-grid" style={{marginTop: '20px'}}>
      <button className="button" id={id} onClick={() => {if (setNumber === 1) {setShowSubs(true)}}}>Substitute</button>
      <button className="button" id={id} onClick={handleNext}>Do next</button>
      <button className="button" id={id} onClick={handleEnd}>Send to end</button>
      <button className="button" id='sub-btn' onClick={getNextSet}> Skip Set </button>
    </div>
    <div ref={dropdownRef} className="center-grid "style={{position:'relative', width: '400px'}}>
      <div id="sub-dropdown" style={{display: showSubs === false? 'none': 'grid', position: 'absolute', left:'12.5%', top:'0px', width: '75%'}}>
        {subOptions.map((option) => (
          <button id="sub-option" onClick={() => handleSub(option)}>
            {option}
          </button>
        ))}
      </div>
    </div>
    </>
  )
}

export default SubButtons;