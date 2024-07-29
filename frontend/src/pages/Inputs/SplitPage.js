import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import ProgressBar from '../../components/ProgressBar';
import ErrorText from '../../components/ErrorText';
import axios from "axios";

function SplitPage({ inputs, setInputs, index, routes, handleRestart}) {

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
      setChoice(-1);
      setIds(new Array(choices.length).fill("split-entry"));
      setBottomID("restricted-button");
    } else {
      setShowError(true);
    }
  }

  const handleNext = () => {
    if (choice > -1) {
      const newInputs = {...inputs};
      newInputs.splits = splits;
      newInputs.splits.selection = choices[choice][0];
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
    <ProgressBar index={index} routes={routes} handleNext={handleNext} handleRestart={handleRestart}></ProgressBar>
    </>
  );
}

export default SplitPage;