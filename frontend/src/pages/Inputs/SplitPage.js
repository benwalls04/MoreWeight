import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import ProgressBar from '../../components/ProgressBar';
import ErrorText from '../../components/ErrorText';
import axios from "axios";

function SplitPage({ inputs, setInputs, index, routes, initSelection, lastSplits, setLastSplits}) {

  const [choice, setChoice] = useState(-1);
  const [choices, setChoices] = useState(inputs.splits.selection);

  const [showError, setShowError] = useState(false);
  const [errorText, setErrorText] = useState("Please select one of the options to continue.");

  const [splits, setSplits] = useState(inputs.splits);

  const navigate = useNavigate();

  const partition = async () => {
    if (bottomId === "allowed-button") {
      const response = await axios.post('http://localhost:3001/partition', { splits: choices[choice]});
      setChoices(response.data);
      let newSplits = {...splits};
      splits.selection = response.data;
      setSplits(newSplits);
      let lastSplits2 = [...lastSplits];
      lastSplits2.push(choices);
      setLastSplits(lastSplits2);
      setChoice(-1);
      setIds(new Array(choices.length).fill("split-entry"));
      setBottomID("restricted-button");
    } else {
      setShowError(true);
    }
  }

  const handleBack = () => {
    if (lastSplits.length === 0){
      let newInputs = {...inputs};
      newInputs.splits.selection = initSelection;
      setInputs(newInputs);
      navigate('/base'); 
    } else {
      let newInputs = {...inputs}; 
      newInputs.splits.selection = lastSplits;
      let lastSplits2 = [...lastSplits];
      setChoices(lastSplits2.pop());
      setLastSplits(lastSplits2);
      setChoice(-1);
      setInputs(newInputs);
    }
  }

  const handleNext = () => {
    if (choice > -1) {
      const newInputs = {...inputs};
      newInputs.splits = splits;
      newInputs.splits.selection = choices[choice][0];
      newInputs.title = getTitle(newInputs.base, choices[choice][0])
      let lastSplits2 = [...lastSplits];
      lastSplits2.push(choices);
      setLastSplits(lastSplits2);
      setInputs(newInputs);
      navigate('/style');
    } else {
      setShowError(true);
    }
  }

  const [ids, setIds] = useState(new Array(choices.length).fill("split-entry"))
  const [bottomId, setBottomID] = useState("restricted-button");

  const handleClick = (index) => {
    const newIds = new Array(choices.length).fill("split-entry");
    newIds[index] = "split-entry-select";
    setIds(newIds);
    setChoice(index);

    if (choices[index].length > 4){
      setBottomID("allowed-button");
    } else {
      setBottomID("restricted-button");
      setErrorText("There are no other options that are similar to this routine. If you like this routine, please click next.");
    }
    setShowError(false);
  };

  return (
    <>
    <div>
      <div className="div-container">
        <h3>Which routine do you prefer?</h3>
        <div id="split-grid">
          {choices.map((choice, i) => (
            <button key={i} id={ids[i]} onClick={() => handleClick(i)}>
              <h5>{getTitle(inputs.base, choice[0])}</h5>
              <div id="day-grid">
                {choice[0].map((day, j) => (
                  <div id="day-grid-row" key={j}>
                    <div id="day-grid-entry" className="small-text-left">day {j + 1}</div>
                    <div id="day-grid-entry" className="small-text-left">{day}</div>
                  </div>
                ))}
              </div>
            </button>
          ))}
        </div>
        <div id="restricted-button-container">
          <button id={bottomId} onClick={() => partition()}>
            Show me more
          </button>
    </div>
      </div>
    </div>
    <ErrorText show={showError} text={errorText}></ErrorText>
    <div id="bottom-text" className="small-text-left">
      If you would like to see more routines, select your favorite of the current options and click "show me more". When you find one you would like to use, click "next"
    </div>
    <ProgressBar index={index} routes={routes} handleNext={handleNext} handleBack={handleBack}></ProgressBar>
    </>
  );

  function getTitle(base, split){
    let title = '';

    if (base.includes("Push Pull Legs")){
      if (split.length > 5 && split.some(day => day.includes("triceps") && day.includes("biceps")) && split.some(day => day.includes("chest") && day.includes("back"))){
        title = "PPL / Arnold Split"
      } else if (split.length > 4 && split.some(day => day.includes("chest") && day.includes("shoulders") && day.includes("back") && day.includes("triceps") && day.includes("biceps"))){
        title = "PPL / Upper Lower Split"
      } else if (split.length > 5 && split.some(day => day === "chest") || split.some(day => day === "back")){
        title = "PPL / Body Part Split"
      } else {
        title = "Push Pull Legs";
      }
    } else if (base.includes("Upper Lower")){
      if (split.length > 4 && split.some(day => day.includes("triceps") && day.includes("biceps")) && split.some(day => day.includes("chest") && day.includes("back"))){
        title = "Upper Lower / Arnold Split"
      } else if (split.length > 4 && split.some(day => day.includes("chest") && day.includes("triceps")) && split.some(day => day.includes("back") && day.includes("biceps"))){
        title = "Upper Lower / PPL Split"
      } else if (split.length > 5 && split.some(day => day === "chest") || split.some(day => day === "back")){
        title = "Upper Lower / Body Part Split"
      } else {
        title = "Upper Lower";
      }
    } else if (base.includes("Body Part Split")){
      if (split.length > 5 && split.some(day => day.includes("triceps") && day.includes("biceps")) && split.some(day => day.includes("chest") && day.includes("back"))){
        title = "Body Part / Arnold Split"
      } else if (split.length > 5 && split.some(day => day.includes("chest") && day.includes("triceps")) && split.some(day => day.includes("back") && day.includes("biceps"))){
        title = "Body Part / PPL Split"
      } else if (split.length > 4 &&split.some(day => day.includes("chest") && day.includes("shoulders") && day.includes("back") && day.includes("triceps") && day.includes("biceps"))){
        title = "Body Part / Upper Lower Split"
      } else {
        title = "Body Part Split";
      }
    } else if (base.includes("Arnold Split")){
      if (split.some(day => day.includes("chest") && day.includes("shoulders") && day.includes("back") && day.includes("triceps") && day.includes("biceps"))){
        title = "Arnold Split / Upper Lower Split"
      } else if (split.some(day => day.includes("chest") && day.includes("triceps")) && split.some(day => day.includes("back") && day.includes("biceps"))){
        title = "Arnold Split / PPL Split"
      } else if (split.some(day => day.includes("chest") || day.includes("back"))){
        title = "Arnold Split / Body Part Split"
      } else {
        title = "Arnold Split";
      }
    }

    return title;
  }
}

export default SplitPage;