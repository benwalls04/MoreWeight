import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import SelectMany from '../../components/SelectMany.js';
import ProgressBar from '../../components/ProgressBar.js';
import ErrorText from '../../components/ErrorText.js';

function DaysPage({setInputs, inputs, index, routes, handleRestart}) {
  const navigate = useNavigate();

  const [showError, setShowError] = useState(false);
  const errorText = "Please select at least three days to continue"

  const handleNext = () => {
    if (choices.filter(choice => choice).length < 3){
      setShowError(true);
      return;
    } else {
      let schedule = ["rest", "rest", "rest", "rest", "rest", "rest", "rest"];
      choices.forEach((choice, index) => {
        if (choice) {
          schedule[index] = "lift";
        }
      })
      let newInputs = inputs;
      newInputs.schedule = schedule;
      navigate(routes[index + 1]);
      setInputs(newInputs)
    }
  }

  const options = ["M", "T", "W", "Th", "F", "S", "Su"];
  const [choices, setChoices] = useState(new Array(options.length).fill(false));
  return (
    <>
    <div>
      <div className="div-container">
        <h2> Which days would you like to lift? </h2>
        <SelectMany options={options} choices={choices} setChoices={setChoices}></SelectMany>
      </div>
    </div>
    <ProgressBar index={index} routes={routes} handleNext={handleNext} handleRestart={handleRestart}></ProgressBar>
    <ErrorText show={showError} text={errorText}></ErrorText>
    </>
  )
}

export default DaysPage;