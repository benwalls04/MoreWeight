import TopButtons from "../components/TopButtons";
import DayButtons from "../components/DayButtons";
import WorkoutInfo from "../components/WorkoutInfo";
import FooterMenu from "../components/FooterMenu";
import { useState } from "react";

const liftsToNotes = new Map([
  ["barbell bench pressn", ""],
  ["barbell bench pressu", "incline"],
  ["barbell bench pressl", "decline"],
  ["dumbell bench pressn", ""],
  ["dumbell bench pressu", "incline"],
  ["dumbell bench pressl", "decline"],
  ["smith machine bench pressn", ""],
  ["smith machine bench pressu", "incline"],
  ["smith machine bench pressl", "decline"],
  ["weighted dipsl", ""],
  ["machine chest pressn", ""],
  ["machine chest pressu", "incline"],
  ["machine chest pressl", "decline"],
  ["standing cable flyn", ""],
  ["standing cable flyu", "low to high"],
  ["standing cable flyl", "high to low"],
  ["seated pec-decn", ""],
  ["barbell rown", "neutral grip>elbows 45 degrees"],
  ["barbell rowu", "wide grip>elbows 75 degrees degrees"],
  ["barbell rowl", "underhand close grip>elbows 15 degrees"],
  ["lat pull downn", "neutral grip"],
  ["lat pull downu", "wide grip"],
  ["lat pull downl", "underhand close grip"],
  ["tbar rown", "neutral grip>elbows 45 degrees"],
  ["tbar rowu", "wide grip>elbows 75 degrees degrees"],
  ["tbar rowl", "underhand close grip>elbows 15 degrees"],
  ["foot supported cable rown", "neutral grip attachement"],
  ["foot supported cable rowu", "wide mag grip attachement"],
  ["foot supported cable rowl", "triangle grip attacement"],
  ["weighted pull-upsn", "neutral grip"],
  ["weighted pull-upsu", "wide grip"],
  ["chest supported machine rown", "neutral grip>elbows 45 degrees"],
  ["chest supported machine rowu", "wide grip>elbows 75 degrees degrees"],
  ["chest supported machine rowl", "underhand close grip>elbows 15 degrees"],
  ["lat pull overl", "rope attachement>elbows in"],
  ["kneeling single arm rowl", "keep arm at side>pull elbow to the hip"],
  ["dumbell rown", "elbows 45 degrees"],
  ["dumbell rowl", "elbows 15 degrees"],
  ["dumbell rowu", "elbows 75 degrees"],
  ["barbell squatq", "high bar"],
  ["barbell squatn", "neutral bar"],
  ["barbell squath", "low bar"],
  ["hack squatq", ""],
  ["bulgarian split squatq", "close stance"],
  ["bulgarian split squatn", "neutral stance"],
  ["bulgarian split squath", "far stance"],
  ["leg pressq", "feet low and close"],
  ["leg pressn", "feet neutral"],
  ["leg pressh", "feet high and wide"],
  ["smith machine squatq", "heel elevated"],
  ["smith machine squatn", "neutral"],
  ["smith machine squath", "no elevation"],
  ["leg extensionq", ""],
  ["smith machine reverse lungeq", "close stance"],
  ["smith machine reverse lungen", "neutral"],
  ["smith machine reverse lungeh", "far stance"],
  ["smith machine bulgarian split squatq", "close stance"],
  ["smith machine bulgarian split squatn", "neutral"],
  ["smith machine bulgarian split squath", "far stance"],
  ["barbell deadlifth", ""],
  ["barbell romanian deadlifth", ""],
  ["dumbell romanian deadlifth", ""],
  ["seated leg curlh", ""],
  ["lying leg curlh", ""],
  ["standing mililtary pressn", ""],
  ["seated dumbell overhead pressn", ""],
  ["seated smith machine overhead pressn", ""],
  ["machine overhead pressn", ""],
  ["cable front raisen", ""],
  ["dumbell front raisen", ""],
  ["alternating dumbell curln", "standard curl"],
  ["alternating dumbell curlb", "hammer curl>arm path cross body"],
  ["incline dumbell curll", "elbows perpendicular to ground"],
  ["preacher curls", ""],
  ["isometric dumbell preacher curls", ""],
  ["isometric concentration curls", "elbow pinned to inner thigh"],
  ["cable curln", "straight bar attachement>elbows at side"],
  ["cable curlb", "rope attachement"],
  ["cable curls", "straight bar attachement>elbows in front"],
  ["cable curll", "straight bar attachement>elbows behind"],
  ["barbell curln", "elbows at side"],
  ["barbell curls", "elbows in front"],
  ["barbell curll", "elbows behind"],
  ["skullcrushern", "elbows perpendicular>no incline"],
  ["skullcrusherla", "elbows slanted back>incline"],
  ["skullcrusherl", "elbows slanted back>no incline"],
  ["tricep pushdownn", "straight bar attachement"],
  ["tricep pushdownla", "straight bar attachement>elbows in"],
  ["tricep pushdownl", "straight bar attachement>elbows at side"],
  ["tricep pushdownm", "rope attachement>rotate wrists at bottom"],
  ["overhead cable tricep extensionl", ""],
  ["cross body tricep extensionm", "elbows flared"],
  ["cross body tricep extensionla", "elbows at side"],
  ["dumbell lateral raisen", ""],
  ["egyptian lateral raisen", ""],
  ["decline lateral raisen", ""],
  ["machine lateral raisen", ""],
  ["cable lateral raisen", ""],
  ["egyptian cable lateral raisen", ""],
  ["rope face pullsn", ""],
  ["reverse pec decn", ""],
  ["dumbell rear delt flyn", ""],
  ["cable rear delt flyn", ""],
  ["barbell shrugsn", "lean forward at bottom>stand upright at top"],
  ["barbell shrugsu", "stand upright"],
  ["barbell shrugsl", "lean forward"],
  ["dumbell shrugsn", "lean forward at bottom>stand upright at top"],
  ["dumbell shrugsu", "stand upright"],
  ["dumbell shrugsl", "lean forward"],
  ["isometric cable shrugsu", ""],
  ["smith machine shrugsn", "lean forward at bottom>stand upright at top"],
  ["smith machine shrugsu", "stand upright"],
  ["smith machine shrugsl", "lean forward"],
  ["smith machine calf raisen", "toes neutral"],
  ["smith machine calf raiseo", "toes inward"],
  ["smith machine calf raisei", "toes outward"],
  ["machine calf raisen", "toes neutral"],
  ["machine calf raiseo", "toes inward"],
  ["machine calf raisei", "toes outward"],
  ["dumbell calf raisen", "toes neutral"],
  ["barbell calf raisen", "toes neutral"],
]);
const liftsToImg = new Map([
  ["barbell bench press", "bench-press.jpg"],
  ["dumbell bench press", "dumbell-press.png"],
  ["weighted dips", "dips.png"],
  ["smith machine bench press", "bench-press.jpg"],
  ["machine chest press", "machine-chest-press.png"],
  ["standing cable fly", "cable.png"],
  ["seated pec-dec", "pec-dec.png"],
  ["barbell row", "barbell-deadlift.png"],
  ["weighted pull-ups", "pull-ups.png"],
  ["lat pull down", "lat-pulldown.png"],
  ["tbar row", "tbar-row.png"],
  ["foot supported cable row", "seated-row.png"],
  ["chest supported machine row", "seated-row.png"],
  ["lat pull over", "lat-pullover.png"],
  ["kneeling single arm row", "cable.png"],
  ["dumbell row", "dumbell-row.png"],
  ["barbell squat", "barbell-squat.png"],
  ["hack squat", "hack-squat.jpg"],
  ["bulgarian split squat", "bulgarian-split-squat.jpg"],
  ["leg press", "leg-press.png"],
  ["smith machine squat", "barbell-squat.png"],
  ["leg extension", "leg-extension.png"],
  ["smith machine reverse lunge", "calf-raise.png"],
  ["barbell deadlift", "barbell-deadlift.png"],
  ["barbell romanian deadlift", "barbell-deadlift.png"],
  ["dumbell romanian deadlift", "barbell-deadlift.png"],
  ["smith machine bulgarian split squat", "bulgarian-split-squat.jpg"],
  ["seated leg curl", "leg-extension.png"],
  ["lying leg curl", "lying-leg-curl.png"],
  ["standing mililtary press", "military-press.png"],
  ["seated dumbell overhead press", "dumbell-overhead-press.png"],
  ["seated smith machine overhead press", "military-press.png"],
  ["machine overhead press", "machine-shoulder-press.png"],
  ["cable front raise", "cable.png"],
  ["dumbell front raise", "dumbell-curl.png"],
  ["alternating dumbell curl", "dumbell-curl.png"],
  ["incline dumbell curl", "incline-curl.png"],
  ["preacher curl", "preacher-curl.png"],
  ["isometric dumbell preacher curl", "preacher-curl.png"],
  ["isometric concentration curl", "concentration-curl.png"],
  ["cable curl", "barbell-curl.png"],
  ["barbell curl", "barbell-curl.png"],
  ["skullcrusher", "dumbell-press.png"],
  ["tricep pushdown", "lat-pullover.png"],
  ["overhead cable tricep extension", "cable.png"],
  ["cross body tricep extension", "cable.png"],
  ["dumbell lateral raise", "lateral-raise.png"],
  ["egyptian lateral raise", "lateral-raise"],
  ["decline lateral raise", "lateral-raise.png"],
  ["machine lateral raise", "lateral-raise.png"],
  ["cable lateral raise", "lateral-raise.png"],
  ["egyptian cable lateral raise", "lateral-raise.png"],
  ["rope face pulls", "cable.png"],
  ["reverse pec dec", "pec-dec.png"],
  ["dumbell rear delt fly", "dumbell-row.png"],
  ["cable rear delt fly", "cable-rear-delt-fly.png"],
  ["barbell shrugs", "shrugs.jpg"],
  ["dumbell shrugs", "shrugs.jpg"],
  ["isometric cable shrugs", "shrugs.jpg"],
  ["smith machine shrugs", "shrugs.jpg"],
  ["smith machine calf raise", "calf-raise.png"],
  ["machine calf raise", "seated-calf-raise.png"],
  ["dumbell calf raise", "calf-raise.png"],
  ["barbell calf raise", "calf-raise.png"],
]);
const weekdays = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];

const RoutinePage = ({ outputData }) => {
  function initDropdowns(splitIndex) {
    const arr = [];
    for (let i = 0; i < 7; i++) {
      arr[i] = new Array(routine.workouts[i].movements.length).fill(false);
    }
    return arr;
  }
  const [index, setIndex] = useState(0);
  const [routine, setRoutine] = useState(outputData[0][0]);
  const [dayIndex, setDayIndex] = useState(0);
  const [day, setDay] = useState("monday")
  const [ids, setIds] = useState(["select-day", "", "", "", "", "", ""]);
  const [dropdowns, setDropdowns] = useState(initDropdowns(index));

  const changeIndex = (direction) => {
    const newIndex =
      (index + direction + outputData.length) % outputData.length;
    setIndex(newIndex);
    setRoutine(outputData[newIndex][0]);
    setDayIndex(0);
    changeDayIndex(dayIndex);
    setDropdowns(initDropdowns(index));
  };

  const changeDayIndex = (buttonIndex) => {
    const newDays = ["", "", "", "", "", "", ""];
    newDays[buttonIndex] = "select-day";
    setIds(newDays);
    setDayIndex(buttonIndex);
    setDay(weekdays[buttonIndex]);
  };

  const changeDropdowns = (movement) => {
    const workoutIndex = routine.workouts[dayIndex].movements.indexOf(movement)
    let newDropdowns = [...dropdowns];
    const oldVal = newDropdowns[dayIndex][workoutIndex];
    newDropdowns[dayIndex][workoutIndex] = !oldVal;
    setDropdowns(newDropdowns);
  };

  return (
    <>
      <div id="main-header">
        <TopButtons index={index} changeIndex={changeIndex}></TopButtons>
        <div id="routine-title-container">
          <div id="routine-title">{routine.title}</div>
        </div>
      </div>
      <div id="sub-header">
        <DayButtons ids={ids} changeDayIndex={changeDayIndex}></DayButtons>
        <div id="workout-title-box">
          <div id="workout-title"> {routine.workouts[dayIndex].title} </div>
        </div>
        {routine.workouts[dayIndex].movements.map((movement) => (
          <WorkoutInfo
            movement={movement}
            sets = {Object.values(routine.workouts[dayIndex].allSets).filter(set => set.variant === movement)}
            showDropdown={
              dropdowns[dayIndex][
                routine.workouts[dayIndex].movements.indexOf(movement)
              ]
            }
            changeDropdowns={changeDropdowns}
            notes={liftsToNotes}
            image={liftsToImg.get(movement.substring(0, movement.length - 1))}
          />
        ))}
      </div>
      <></>
      <FooterMenu index={0}/>
    </>
  );
};

export default RoutinePage;

