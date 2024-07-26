import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import SelectOne from '../../components/SelectOne.js';
import ProgressBar from '../../components/ProgressBar.js';

function ShouldersPage({updateInputs, index, routes, handleRestart}) {
  const navigate = useNavigate();

  const [showError, setShowError] = useState(false);

  const handleNext = () => {
    const bias = choice.includes(true) ? options[choice.indexOf(true)] : "Neutral";
    updateInputs(bias, index); 
    navigate(routes[index + 1]);
  }

  const options = ["Front Deltoids", "Side Deltoids", "Rear Deltoids"];
  const [choice, setChoice] = useState(new Array(options.length).fill(false));
  return (
    <>
    <div>
      <div className="div-container">
        <h3> Which region of the shoulders would you like to bias?</h3>
        <SelectOne options={options} setChoice={setChoice} setShow={setShowError}></SelectOne>
      </div>
    </div>
    <div id="bottom-text" className="small-text-left">
      Select the region that would want to work the most. All of the regions will be targeted, but the region you select will have priority when placing your workouts. This part is optional.
    </div>
    <ProgressBar index={index} routes={routes} handleNext={handleNext} handleRestart={handleRestart}></ProgressBar>
    </>
  )
}

export default ShouldersPage;