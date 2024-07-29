import DayButtons from "../components/DayButtons";
import WorkoutInfo from "../components/WorkoutInfo";
import liftData from "../utils/staticData";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const EditPage = ({ routine, setRoutine, username, expIcon, numberOfSets, setLog, setRecents}) => {
  
  const navigate = useNavigate();

  const weekdays = routine.days.length === 7? ["M", "T", "W", "Th", "F", "S", "Su"] : [];
  if (routine.days.length !== 7){
    for (let i = 0; i < routine.days.length; i++){
      weekdays.push("day " + (i + 1));
    }
  }

  function initDropdowns() {
    const arr = [];
    for (let i = 0; i < 7; i++) {
      arr[i] = new Array(routine.days[i].movements.length).fill(false);
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
    const workoutIndex = routine.days[dayIndex].movements.indexOf(movement)
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
      const updatedRoutine = { ...prevRoutine };
      updatedRoutine.days[dayIndex].allSets = updatedRoutine.days[dayIndex].allSets.filter(set => set.variant !== movement);
      updatedRoutine.days[dayIndex].movements = updatedRoutine.days[dayIndex].movements.filter(mov => mov !== movement);
      return updatedRoutine;
    });
  }

  const addMovement = (movement) => {
    const updatedRoutine = { ...routine };
    let movements = updatedRoutine.days[dayIndex].movements;
    let allSets = updatedRoutine.days[dayIndex].allSets;

    movements.splice(movements.indexOf(movement) + 1, 0, "new movement");
    updatedRoutine.days[dayIndex].movements = movements;

    const lastIndex = findLastIndex(allSets, "variant", movement);
    for (let i = 0; i < numberOfSets; i++){
      allSets.splice(lastIndex + 1, 0, { variant: "new movement", liftType: 1, RPE: 0, rest: 0 });
    }
    updatedRoutine.days[dayIndex].allSets = allSets;
    
    setRoutine(updatedRoutine);
  }

  const moveUp = (movement) => {
    const updatedRoutine = { ...routine };
    let movements = updatedRoutine.days[dayIndex].movements;
    let allSets = updatedRoutine.days[dayIndex].allSets;

    const index = movements.indexOf(movement);
    if (index > 0){
      let temp = movements[index]
      movements[index] = movements[index - 1];
      movements[index - 1] = temp;

      const allSetsIndex = allSets.findIndex(set => set.variant === movement)
      const removed = allSets.splice(allSetsIndex, numberOfSets);
      removed.forEach((set, indx) => {
        allSets.splice(allSetsIndex - numberOfSets + indx, 0, set)
      })
    }
    updatedRoutine.days[dayIndex].movements = movements;
    updatedRoutine.days[dayIndex].allSets = allSets;

    setRoutine(updatedRoutine)
  }

  const moveDown = (movement) => {
    const updatedRoutine = { ...routine };
    let movements = updatedRoutine.days[dayIndex].movements;
    let allSets = updatedRoutine.days[dayIndex].allSets;

    const index = movements.indexOf(movement);
    if (index < movements.length - 1){
      let temp = movements[index]
      movements[index] = movements[index + 1];
      movements[index + 1] = temp;

      const allSetsIndex = allSets.findIndex(set => set.variant === movement)
      const removed = allSets.splice(allSetsIndex, numberOfSets);
      removed.forEach((set, indx) => {
        allSets.splice(allSetsIndex + numberOfSets + indx, 0, set)
      })
    }
    updatedRoutine.days[dayIndex].movements = movements;
    updatedRoutine.days[dayIndex].allSets = allSets;

    setRoutine(updatedRoutine)
  }

  const changeMovement = (newMovement, oldMovement, setShowSubs, setSubText) => {
    const updatedRoutine = { ...routine };
    let movements = updatedRoutine.days[dayIndex].movements;
    let allSets = updatedRoutine.days[dayIndex].allSets;

    // update movements array
    movements[movements.indexOf(oldMovement)] = newMovement;
    updatedRoutine.days[dayIndex].movements = movements;

    // get info for the new movement 
    const firstIndex =  findFirstIndex(allSets, "variant", oldMovement);
    const oldLiftType = allSets[firstIndex].liftType;

    const movementInfo = liftData[2][newMovement].movement in liftData[3]? liftData[3][liftData[2][newMovement].movement] : liftData[10][liftData[2][newMovement].movement];
    const newLiftType = movementInfo.liftTypes.includes(oldLiftType)? oldLiftType: movementInfo.liftTypes[0];
    const RPESeq = movementInfo.sequences[expIcon];

    // update allSets array
    let count = 0;
    for (let i = firstIndex; i < allSets.length; i++){
      if (allSets[i].variant === oldMovement){
        allSets[i] = {
          variant: newMovement, liftType: newLiftType, RPE: RPESeq[count], rest: liftData[0][newLiftType - 1][RPESeq[count] - 7]
        }
        count++;
      }
    }
    updatedRoutine.days[dayIndex].allSets = allSets;

    setShowSubs(false);
    setSubText(newMovement);
    setRoutine(updatedRoutine);
  }

  const updateSets = (updatedSets, setIndex, movement) => {
    setRoutine(prevRoutine => {
      let allSets = routine.days[dayIndex].allSets;
      let count = 0; let allSetsIndex = 0;
      for (let i = 0; count <= setIndex && i < allSets.length; i++){
        if (allSets[i].variant === movement){
          count++;
          allSetsIndex = i;
        }
      }
      const updatedRoutine = { ...prevRoutine };
      updatedRoutine.days[dayIndex].allSets[allSetsIndex] = updatedSets; 
      return updatedRoutine; 
    });
  }

  const handleSubmit = async () => {
    await axios.post('http://moreweight-api-v1.us-east-1.elasticbeanstalk.com/set-routine', {routine: routine, username: username}).then(response => {
      setLog(response.data.movements);
      setRecents(response.data.recents);
      navigate('/profile');
    }).catch(error => {
      console.log("error setting routine");
    })
  }

  return (
    <div className='page-body'>
      <DayButtons ids={ids} changeDayIndex={changeDayIndex} weekdays={weekdays}></DayButtons>
      <div className="center-div">
        <h2> {routine.days[dayIndex].title} </h2>
      </div>
      {routine.days[dayIndex].movements.map((movement, index) => (
        <WorkoutInfo
          title={routine.days[dayIndex].title}
          accessories={routine.days[dayIndex].accessories}
          movements={routine.days[dayIndex].movements}
          movement={movement}
          sets = {Object.values(routine.days[dayIndex].allSets).filter(set => set.variant === movement)}
          showDropdown={
            dropdowns[dayIndex][
              routine.days[dayIndex].movements.indexOf(movement)
            ]
          }
          changeDropdowns={changeDropdowns}
          updateSets={updateSets}
          removeMovement={removeMovement}
          addMovement={addMovement}
          moveUp={moveUp}
          moveDown={moveDown}
          changeMovement={changeMovement}
          liftData={liftData}
        />
      ))}
      <button id="submit-footer" className="button" onClick={handleSubmit}> Done Editing </button>
    </div>
  );
};

export default EditPage;

