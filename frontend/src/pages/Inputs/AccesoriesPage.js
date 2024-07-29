import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import SelectMany from '../../components/SelectMany.js';
import ProgressBar from '../../components/ProgressBar.js';

function AccesoriesPage({inputs, setInputs, index, routes, handleRestart}) {
  const navigate = useNavigate();

  const handleNext = () => {
    let accessories = options
    .map((entry, index) => choices[index] ? entry.toLowerCase() : null)
    .filter(entry => entry !== null);
    console.log(accessories)
    let newInputs = {...inputs};
    inputs.accessories = accessories;
    setInputs(newInputs);
    navigate('/chest')
  }

  const options = ["Calves", "Abs", "Traps", "Side Deltoids", "Rear Deltoids", "Forearms"];
  const [choices, setChoices] = useState(new Array(options.length).fill(false));

  return (
    <>
    <div>
      <div className="div-container">
        <h2> Which accessory groups would you like to work on? </h2>
        <SelectMany options={options} choices={choices} setChoices={setChoices}></SelectMany>
      </div>
    </div>
    <div className="small-text-left" id="bottom-text">Select the accessory groups that you would like to train. These groups will be trained at the end of the workout if time allows for it. This part is optional.</div>
    <ProgressBar index={index} routes={routes} handleNext={handleNext} handleRestart={handleRestart}></ProgressBar>
    </>
  )
}

export default AccesoriesPage;