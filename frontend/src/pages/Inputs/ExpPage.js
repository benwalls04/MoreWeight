import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import SelectOne from '../../components/SelectOne.js';
import ErrorText from '../../components/ErrorText.js';
import ProgressBar from '../../components/ProgressBar.js';

function ExperiencePage({setInputs, inputs, index, routes, setExperience, handleRestart}) {
  const navigate = useNavigate();

  const [showError, setShowError] = useState(true);
  const errorText = "Please choose one of the options to continue";

  const handleNext = () => {
    if (!showError) {
      const expIcon = choice === "0-2 years" ? 'b' : choice === "2-4 years" ? 'i' : 'a';
      let newInputs = inputs;
      newInputs.exp = expIcon;
      navigate(routes[index + 1]);
      setInputs(newInputs)
      setExperience(expIcon);
    }
  }

  const options = ["0-2 years", "2-4 years", "4+ years"];
  const [choice, setChoice] = useState(new Array(options.length).fill(false));

  return (
    <>
    <div>
      <div className="div-container">
        <h1> What is your experience level? </h1>
        <SelectOne options={options} setChoice={setChoice} setShow={setShowError}></SelectOne>
      </div>
    </div>
    <ProgressBar index={index} routes={routes} handleNext={handleNext} handleRestart={handleRestart}></ProgressBar>
    <ErrorText show={showError} text={errorText}></ErrorText>
    </>
  )
}

export default ExperiencePage;