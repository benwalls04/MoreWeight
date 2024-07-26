import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import SelectOne from '../../components/SelectOne.js';
import ErrorText from '../../components/ErrorText.js';
import ProgressBar from '../../components/ProgressBar.js';

function ExperiencePage({updateInputs, index, routes, setExpIcon, handleRestart}) {
  const navigate = useNavigate();

  const [showError, setShowError] = useState(true);
  const errorText = "Please choose one of the options to continue";

  const handleNext = () => {
    if (!showError) {
      updateInputs(choice, index); 
      navigate(routes[index + 1]);
      setExpIcon(choice === "0" || choice === "1"? 'b': choice === "2" || choice === "3"? 'i': 'a')
    }
  }

  const options = ["0", "1", "2", "3", "4", "5+"];
  const [choice, setChoice] = useState(new Array(options.length).fill(false));

  return (
    <>
    <div>
      <div className="div-container">
        <h1> How many years have you been lifting? </h1>
        <SelectOne options={options} setChoice={setChoice} setShow={setShowError}></SelectOne>
      </div>
    </div>
    <ProgressBar index={index} routes={routes} handleNext={handleNext} handleRestart={handleRestart}></ProgressBar>
    <ErrorText show={showError} text={errorText}></ErrorText>
    </>
  )
}

export default ExperiencePage;