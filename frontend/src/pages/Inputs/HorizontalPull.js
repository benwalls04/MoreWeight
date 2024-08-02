import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import SelectOne from '../../components/SelectOne.js';
import ProgressBar from '../../components/ProgressBar.js';
import ErrorText from '../../components/ErrorText.js';

function HorizontalPull({inputs, setInputs, index, routes}) {
  const navigate = useNavigate();

  const [showError, setShowError] = useState(false);
  const errorText = "Please choose one of the options to continue";

  const handleBack = () => {
    navigate('/vertical-press');
  }

  const handleNext = () => {
    if (Array.isArray(choice) && choice.every((val) => !val)) {
      setShowError(true);
    } else {
      let newInputs = {...inputs};
      newInputs["horizontal-pull"] = choice.toLowerCase();
      setInputs(newInputs);
      navigate('/vertical-pull');
    }
  }

  const options = ["T-Bar Row", "Barbell Row", "Seated Cable Row", "Machine Row"];
  const [choice, setChoice] = useState(new Array(options.length).fill(false));
  return (
    <>
    <div>
      <div className="div-container">
        <h3> Which movement do you prefer? </h3>
        <SelectOne options={options} setChoice={setChoice} id={"movement-button"} setShow={setShowError}></SelectOne>
      </div>
    </div>
    <ProgressBar index={index} routes={routes} handleNext={handleNext} handleBack={handleBack}></ProgressBar>
    <ErrorText show={showError} text={errorText}></ErrorText>
    </>
  )
}

export default HorizontalPull;