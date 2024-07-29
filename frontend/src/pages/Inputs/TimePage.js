import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import SelectOne from '../../components/SelectOne.js';
import ProgressBar from '../../components/ProgressBar.js';
import ErrorText from '../../components/ErrorText.js';

function TimePage({inputs, setInputs, index, routes, handleRestart}) {
  const navigate = useNavigate();

  const [showError, setShowError] = useState(true);
  const errorText = "Please choose one of the options to continue";

  const handleNext = () => {
    if (!showError) {
      let newInputs = {...inputs};
      newInputs.time = parseInt(choice.substring(0, choice.indexOf(" ")));
      setInputs(newInputs); 
      navigate('/accessories');
    }
  }

  const options = ["30 mins", "45 mins", "60 mins", "75 mins", "90 mins", "105 mins", "120 mins"];
  const [choice, setChoice] = useState(new Array(options.length).fill(false));
  return (
    <>
    <div>
      <div className="div-container">
        <h2> What is the longest time you will spend working out? </h2>
        <SelectOne options={options} setChoice={setChoice} setShow = {setShowError}></SelectOne>
      </div>
    </div>
    <ProgressBar index={index} routes={routes} handleNext={handleNext} handleRestart={handleRestart}></ProgressBar>
    <ErrorText show={showError} text={errorText}></ErrorText>
    </>
  )
}

export default TimePage;