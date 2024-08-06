import DayButtons from "../components/DayButtons";
import WorkoutInfo from "../components/WorkoutInfo";
import staticData from "../utils/staticData";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const EditPage = ({ routineObj, setRoutine, username, expIcon, numberOfSets, setLog, setRecents}) => {
  const routine = routineObj.routine;
  const movementInfo = staticData.movements;
  const restTimes = staticData.restTimes;
  
  const navigate = useNavigate();

  const weekdays = routine.length === 7? ["M", "T", "W", "Th", "F", "S", "Su"] : [];
  if (routine.length !== 7){
    for (let i = 0; i < routine.length; i++){
      weekdays.push("day " + (i + 1));
    }
  }

  function initDropdowns() {
    const arr = [];
    for (let i = 0; i < 7; i++) {
      arr[i] = new Array(routine[i].movements.length).fill(false);
    }
    return arr;
  }

  const [dayIndex, setDayIndex] = useState(0);
  const [ids, setIds] = useState(["select-day", "", "", "", "", "", ""]);
  const [dropdowns, setDropdowns] = useState(initDropdowns());

  const changeDayIndex = (buttonIndex) => {
    const newDays = ["", "", "", "", "", "", ""];
    newDays[buttonIndex] = "select-day";
    setIds(newDays);
    setDayIndex(buttonIndex);
  };

  const changeDropdowns = (movement) => {
    const workoutIndex = routine[dayIndex].movements.findIndex(entry => entry.movement === movement)
    let newDropdowns = [...dropdowns];
    const oldVal = newDropdowns[dayIndex][workoutIndex];
    newDropdowns[dayIndex][workoutIndex] = !oldVal;
    setDropdowns(newDropdowns);
  };

  const findLastIndex = (array, key, value) => {
    return array.reduceRight((acc, item, index) => {
      if (acc === -1 && item[key] === value) {
        return index;
      }
      return acc;
    }, -1);
  };

  const findFirstIndex = (array, key, value) => {
    return array.reduce((acc, item, index) => {
      if (acc === -1 && item[key] === value) {
        return index;
      }
      return acc;
    }, -1);
  };

  const removeMovement = (movement) => {
    setRoutine(prevRoutine => {
      const updatedRoutine = {...prevRoutine};
      updatedRoutine.routine[dayIndex].sets = updatedRoutine.routine[dayIndex].sets.filter(set => set.movement !== movement);
      updatedRoutine.routine[dayIndex].movements = updatedRoutine.routine[dayIndex].movements.filter(mov => mov.movement !== movement);
      return updatedRoutine;
    });
  }

  const addMovement = (movement) => {
    const updatedRoutine = {...routineObj};
    let movements = updatedRoutine.routine[dayIndex].movements;
    let sets = updatedRoutine.routine[dayIndex].sets;

    movements.splice(movements.findIndex(entry => entry.movement === movement) + 1, 0, {
      movement: "new movement", 
      bias: 'neutral',
      RPE: [0, 0, 0],
      lowerRep: 0, 
      upperRep: 0,
      stimulus: 0, 
    });
    updatedRoutine.routine[dayIndex].movements = movements;

    const lastIndex = findLastIndex(sets, "movement", movement);
    for (let i = 0; i < numberOfSets; i++){
      sets.splice(lastIndex + 1, 0, { movement: "new movement", lowerRep: 0, upperRep: 0, RPE: 0, rest: 0, num: i + 1});
    }
    updatedRoutine.routine[dayIndex].sets = sets;
    
    setRoutine(updatedRoutine);
  }

  const moveUp = (movement) => {
    const updatedRoutine = {...routineObj};
    let movements = updatedRoutine.routine[dayIndex].movements;
    let sets = updatedRoutine.routine[dayIndex].sets;

    const index = movements.findIndex(entry => entry.movement === movement);
    if (index > 0){
      let temp = movements[index]
      movements[index] = movements[index - 1];
      movements[index - 1] = temp;

      const allSetsIndex = sets.findIndex(set => set.movement === movement)
      const removed = sets.splice(allSetsIndex, numberOfSets);
      removed.forEach((set, indx) => {
        sets.splice(allSetsIndex - numberOfSets + indx, 0, set)
      })
    }
    updatedRoutine.routine[dayIndex].movements = movements;
    updatedRoutine.routine[dayIndex].sets = sets;

    setRoutine(updatedRoutine)
  }

  const moveDown = (movement) => {
    const updatedRoutine = {...routineObj};
    let movements = updatedRoutine.routine[dayIndex].movements;
    let sets = updatedRoutine.routine[dayIndex].sets;

    const index = movements.findIndex(entry => entry.movement === movement);
    if (index < movements.length - 1){
      let temp = movements[index]
      movements[index] = movements[index + 1];
      movements[index + 1] = temp;

      const allSetsIndex = sets.findIndex(set => set.movement === movement)
      const removed = sets.splice(allSetsIndex, numberOfSets);
      removed.forEach((set, indx) => {
        sets.splice(allSetsIndex + numberOfSets + indx, 0, set)
      })
    }

    updatedRoutine.routine[dayIndex].movements = movements;
    updatedRoutine.routine[dayIndex].sets = sets;

    setRoutine(updatedRoutine)
  }

  const changeMovement = (newMovement, oldMovement, setShowSubs, setSubText) => {
    const updatedRoutine = {...routineObj};
    let movements = updatedRoutine.routine[dayIndex].movements;
    let sets = updatedRoutine.routine[dayIndex].sets;

    // get info for the new movement 
    const RPESeq = movementInfo[newMovement].sequences[updatedRoutine.expIcon];
    const lowerRep = oldMovement.movement === "new movement"? 8 : oldMovement.lowerRep;
    const upperRep = oldMovement.movement === "new movement"? 12: oldMovement.upperRep;
    const newBias = movementInfo[newMovement].biasOrder.includes(oldMovement.bias)? oldMovement.bias : movementInfo[newMovement].biasOrder.includes('neutral')? 'neutral': movementInfo[newMovement].biasOrder[0];

    // update movements array
    // FIXME: stimulus is not accurate 
    movements[movements.findIndex(entry => entry.movement === oldMovement.movement)] = {
      movement: newMovement, 
      bias: newBias,
      RPE: RPESeq, 
      lowerRep: lowerRep,
      upperRep: upperRep,
      stimilus: oldMovement.stimulus, 
    };
    updatedRoutine.routine[dayIndex].movements = movements;

    // update allSets array
    // FIXME: last rest is not updated individually 
    const firstIndex = findFirstIndex(sets, "movement", oldMovement.movement);
    let count = 0;
    for (let i = firstIndex; i < sets.length; i++){
      if (sets[i].movement === oldMovement.movement){
        sets[i] = {
          movement: newMovement, RPE: RPESeq[count], rest: restTimes[lowerRep / 2 - 1][RPESeq[count] - 7], num: count + 1, bias: newBias, lowerRep: lowerRep, upperRep: upperRep
        }
        count++;
      }
    }
    updatedRoutine.routine[dayIndex].sets = sets;

    setShowSubs(false);
    setSubText(newMovement);
    setRoutine(updatedRoutine);
  }

  const changeBias = (movement, bias) => {
    const updatedRoutine = {...routineObj};
    let movements = updatedRoutine.routine[dayIndex].movements;
    let sets = updatedRoutine.routine[dayIndex].sets;

    movements[movements.findIndex(entry => entry.movement === movement)].bias = bias;
    updatedRoutine.routine[dayIndex].movements = movements;

    const firstIndex = findFirstIndex(sets, "movement", movement);
    let count = 0;
    for (let i = firstIndex; i < sets.length; i++){
      if (sets[i].movement === movement){
        sets[i].bias = bias;
        count++;
      }
    }
    updatedRoutine.routine[dayIndex].sets = sets;

    setRoutine(updatedRoutine);
  }

  const updateSets = (updatedSets, setIndex, movement) => {
    setRoutine(prevRoutine => {
      let sets = routine[dayIndex].sets;
      let count = 0; let allSetsIndex = 0;
      for (let i = 0; count <= setIndex && i < sets.length; i++){
        if (sets[i].movement === movement){
          count++;
          allSetsIndex = i;
        }
      }
      const updatedRoutine = { ...prevRoutine };
      updatedRoutine[dayIndex].sets[allSetsIndex] = updatedSets; 
      return updatedRoutine; 
    });
  }

  const handleSubmit = async () => {
    if (routineObj.routine.every(day => !day.movements.some(entry => entry.movement === "new movement"))){
      await axios.post('http://localhost:3001/set-routine', {routine: {title: routineObj.title, routine: routine}, username: username}).then(response => {
        setLog(response.data.movements);
        setRecents(response.data.recents);
        navigate('/profile');
      }).catch(error => {
        console.log("error setting routine");
      })
    }
  }

  return (
    <div className='page-body'>
      <DayButtons ids={ids} changeDayIndex={changeDayIndex} weekdays={weekdays}></DayButtons>
      <div className="center-div">
        <h2> {routine[dayIndex].title} </h2>
      </div>
      {routine[dayIndex].movements.map((movement, index) => (
        <WorkoutInfo
          title={routine[dayIndex].title}
          accessories={routine[dayIndex].accessories}
          movements={routine[dayIndex].movements}
          movementObj={movement}
          sets = {Object.values(routine[dayIndex].sets).filter(set => set.movement === movement.movement)}
          showDropdown={
            dropdowns[dayIndex][
              routine[dayIndex].movements.indexOf(movement)
            ]
          }
          changeDropdowns={changeDropdowns}
          updateSets={updateSets}
          removeMovement={removeMovement}
          addMovement={addMovement}
          moveUp={moveUp}
          moveDown={moveDown}
          changeMovement={changeMovement}
          changeBias={changeBias}
        />
      ))}
      <button id="submit-footer" className="button" onClick={handleSubmit}> Done Editing </button>
    </div>
  );
};

export default EditPage;

