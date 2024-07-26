import { useState } from 'react';
import { useEffect } from 'react';
import { useRef } from 'react';


function SubButtons({allSets, setAllSets, setNumber, index, numberOfSets, getNextSet, liftData, expIcon}) {

  const dropdownRef = useRef(null);
  const [movement, setMovement] = useState(allSets[index].variant);
  const [movements, setMovements] = useState(allSets.map(set => set.variant));

  const updateRest = (allSets, index) => {
    const set = allSets[index];
    const nextSet = index < allSets.length - 1? allSets[index + 1] : null;
    set.rest = nextSet === null || liftData[2][set.variant].group !== liftData[2][nextSet.variant].group ? 1 : liftData[0][set.liftType - 1][set.RPE - 7];
  }

  const getSubOptions = (movement) => {
    let region = movement === 'new movement'? 'neutral': liftData[2][movement].region;
    let group = movement === 'new movement'? '': liftData[2][movement].group;

    let options = [];
    for (let name in liftData[2]) {
      if (!movements.includes(name) && liftData[2][name].group === group){
        options.push(name)
      }
    }

    for (let name in liftData[10]){
      liftData[10][name].variants.forEach(variant => {
        if (!movements.includes(variant) && liftData[2][variant].group === group){
          options.push(variant);
        }
      })
    }

    let priorityOptions = []; let lastOptions = [];
    options.forEach(option => {
      const variantInfo = liftData[2][option];

      if (movement in liftData[10]){
        priorityOptions.push(option);
      } else {
        if (variantInfo.region === region){
          priorityOptions.push(option);
        } else {
          lastOptions.push(option);
        }
      }
    })

    options = priorityOptions.concat(lastOptions);

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
    const liftType = liftData[3][liftData[2][option].movement].liftTypes.includes(allSets[index].liftType)? allSets[index].liftType : liftData[3][liftData[2][option].movement].liftTypes[0];
    const RPESeq = liftData[3][liftData[2][option].movement].sequences[expIcon].slice(4 - numberOfSets, 4);
    for (let i = 0; i < numberOfSets; i++){
      const set = newAllSets[index + i];
      set.variant = option;
      set.RPE = RPESeq[i];
      set.liftType = liftType;
      set.rest = allSets[index + i].rest <= 1? 1 : liftData[0][set.liftType - 1][set.RPE - 7];
    }
    updateRest(newAllSets, index);
    setShowSubs(false);
    setAllSets(newAllSets);
    setMovement(option);
    setMovements(allSets.map(set => set.variant));
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
    <div ref={dropdownRef} style={{position:'relative'}}>
      <div id="sub-dropdown" style={{display: showSubs === false? 'none': 'grid', position: 'fixed', left:'320px', top:'160px', width: '300px'}}>
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