import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import SelectOne from '../../components/SelectOne.js';
import ProgressBar from '../../components/ProgressBar.js';
import ErrorText from '../../components/ErrorText.js';

function HorizontalPress({updateInputs, index, routes, handleRestart}) {
  const navigate = useNavigate();

  const [showError, setShowError] = useState(true);
  const errorText = "Please choose one of the options to continue";

  const handleNext = async () => {
    if (!showError) {
      updateInputs(choice, index); 
      navigate(routes[index + 1]);
    }
  }

  const options = ["Barbell Bench Press", "Dumbell Bench Press"];
  const [choice, setChoice] = useState(new Array(options.length).fill(false));
  return (
    <>
    <div>
      <div className="div-container">
        <h3> Which movement do you prefer? </h3>
        <SelectOne options={options} setChoice={setChoice} id={"movement-button"} setShow={setShowError}></SelectOne>
      </div>
    </div>
    <ProgressBar index={index} routes={routes} handleNext={handleNext} handleRestart={handleRestart}></ProgressBar>
    <ErrorText show={showError} text={errorText}></ErrorText>
    </>
  )
}

export default HorizontalPress;