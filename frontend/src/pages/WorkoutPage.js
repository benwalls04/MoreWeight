import React from 'react'
import { useState, useEffect } from 'react'
import FooterMenu from '../components/FooterMenu'
import liftData from '../utils/staticData';
import Dropdown from '../components/Dropdown';
import SetPage from './SetPage';
import SubButtons from '../components/SubButtons'

function WorkoutPage({username, routine, begin, setBegin, nextSet, setNextSet, setLog, lastRest, setLastRest, numberOfSets, time, finished, setFinished, expIcon, setRecents, setNumber, setSetNumber, index, setIndex, recents}) {

  const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

  const today = new Date();
  const weekday = weekdays[today.getDay()];
  const month = months[today.getMonth()];
  const day = today.getDate();
  const workout = routine[(today.getDay() + 6) % 7];
  const movements = workout.movements;
  const [allSets, setAllSets] = useState([...workout.allSets]);

  const showButton = movements.length > 0;

  const [dropdowns, setDropdowns] = useState(new Array(movements.length).fill(false));
  const [icons, setIcons] = useState(new Array(movements.length).fill('+'));
  const [iconClasses, setIconClasses] = useState(new Array(movements.length).fill('expand-button'));

  const initTags = (movements) => {
    let tagsArr = [];
    for (let i = 0; i < movements.length; i++){
      let currTags = [];
      const group = liftData[2][movements[i]].group;
      const region = liftData[2][movements[i]].region;
      if (group !== ''){
        currTags.push(group);
      }
      if (region !== "neutral") {
        currTags.push(region);
      }
      tagsArr.push(currTags);
    }
    return tagsArr;
  }

  const [tagsArr, setTagsArr] = useState(initTags(movements));

  const changeDropdowns = (index) => {
    let newDropdowns = [...dropdowns];
    let newIcons = [...icons];
    let newIconClasses = [...iconClasses];

    newDropdowns[index] = !newDropdowns[index];
    newIcons[index] = newIcons[index] === '+'? '-': '+';
    newIconClasses[index] = newIconClasses[index] === 'expand-button' ? 'close-button' : 'expand-button';
    
    setDropdowns(newDropdowns);
    setIcons(newIcons);
    setIconClasses(newIconClasses);
  }

  const beginWorkout = () => {
    setBegin(true);
    setNextSet(allSets[index]);
    setFinished(false);
  }

  const getNextSet = () => {
    if (index < allSets.length - 1){
      setLastRest(allSets[index].rest);
      setIndex(index + 1);
      setNextSet(allSets[index + 1]);
      setSetNumber(allSets[index + 1].variant === allSets[index].variant && setNumber < numberOfSets? setNumber + 1 : 1);
    } else {
      setFinished(true);
    }
  }

  useEffect(() => {
    setNextSet(allSets[index]);
  }, [allSets]);

  if (!begin || (begin && finished)){
    return (
      <div className="page-body" style={{paddingBottom: '110px'}}>
        <div className="shadow-header" style={{height: '85px'}}>
          <div className="center-div" style={{fontSize:'30px'}}>
            {workout.title}
          </div>
          <div className="center-div">
            {weekday}, {month} {day}
          </div>
        </div>
        {movements.map((movement, index) => {
          return (
          <>
            <div className="lift-container">
              <button className={iconClasses[index]} onClick={() => changeDropdowns(index)}>
                {icons[index]}
              </button>
              <div> {movement} </div>
              <div></div>
              <div className="tag-box">
                {tagsArr[index].map((tag, index) => (
                  <div key={index} className="tag">
                    {tag}
                  </div>
                ))}
              </div>
              <div></div>
              <Dropdown
                show={dropdowns[index]}
                sets={allSets.filter(set => set.variant === movement)}
                reps={liftData[1][allSets.find(set => set.variant === movement).liftType - 1][0] + "-" + liftData[1][allSets.find(set => set.variant === movement).liftType - 1][1]}
                updateSets={() => {}}
                movement={movement}
              />
            </div>
            <div className="center-div" style={{marginTop:'40px', marginBottom:'-20px'}}>
              <div id="edit-line" style={{height: '2px'}}>.</div>
            </div>
          </>
          )
        })}
        <div className="center-div">
          <button className="button" style={{width: '100%', maxWidth: '400px', color:'white', position: 'fixed', bottom: '80px', display: !showButton || (begin && finished) ? 'none': 'block'}} onClick={beginWorkout}> Begin Workout </button>
        </div>
        <FooterMenu index={1} />
      </div>
    )
  } else {
    return (
      <>
      <SubButtons allSets={allSets} setAllSets={setAllSets} setNumber={setNumber} index={index} numberOfSets={numberOfSets} getNextSet={getNextSet} setIndex={setIndex} liftData={liftData} expIcon={expIcon}/>
      <SetPage username={username} nextSet={nextSet} liftData={liftData} lastRest={lastRest} setNumber={setNumber} numberOfSets={numberOfSets} setLog={setLog} getNextSet={getNextSet} time={time} setRecents={setRecents} recents={recents}></SetPage>
      </>
    )
  }
}

export default WorkoutPage
