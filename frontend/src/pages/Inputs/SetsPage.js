import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import SelectOne from '../../components/SelectOne.js';
import ErrorText from '../../components/ErrorText.js';
import ProgressBar from '../../components/ProgressBar.js';

function SetsPage({updateInputs, index, routes, setNumberOfSets, handleRestart}) {
  const navigate = useNavigate();

  const [showError, setShowError] = useState(true);
  const errorText = "Please choose one of the options to continue";

  const handleNext = () => {
    if (!showError) {
      updateInputs(choice, index); 
      navigate(routes[index + 1]);
      setNumberOfSets(parseInt(choice))
    }
  }

  const options = ["2", "3", "4"];
  const [choice, setChoice] = useState(new Array(options.length).fill(false));

  return (
    <>
    <div>
    <div className="div-container">
      <h2> How many sets would you like for each workout? </h2>
      <SelectOne options={options} setChoice={setChoice} setShow={setShowError}></SelectOne>
    </div>
    </div>
    <ProgressBar index={index} routes={routes} handleNext={handleNext} handleRestart={handleRestart}></ProgressBar>
    <ErrorText show={showError} text={errorText}></ErrorText>
    </>
  )
}

export default SetsPage;