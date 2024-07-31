import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import SelectOne from '../../components/SelectOne.js';
import ProgressBar from '../../components/ProgressBar.js';
import ErrorText from '../../components/ErrorText.js';

function Extension({inputs, setInputs, index, routes, handleRestart}) {
  const navigate = useNavigate();

  const [showError, setShowError] = useState(true);
  const errorText = "Please choose one of the options to continue";

  const handleNext = () => {
    if (!showError) {
      let newInputs = {...inputs};
      newInputs["extension"] = choice.toLowerCase();
      setInputs(newInputs);
      console.log(newInputs);
      navigate('/sign-up');
    }
  }

  const options = ["Tricep Pushdown", "Cable Overhead Extension", "Skullcrusher", "Machine Tricep Extension"];
  const [choice, setChoice] = useState(new Array(options.length).fill(false));
  return (
    <>
    <div>
      <div className="div-container">
        <h4> Which movement do you prefer? </h4>
        <SelectOne options={options} setChoice={setChoice} id={"movement-button"} setShow={setShowError}></SelectOne>
      </div>
    </div>
    <ProgressBar index={index} routes={routes} handleNext={handleNext} handleRestart={handleRestart}></ProgressBar>
    <ErrorText show={showError} text={errorText}></ErrorText>
    </>
  )
}

export default Extension;