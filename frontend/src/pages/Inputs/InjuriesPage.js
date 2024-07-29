import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import SelectMany from '../../components/SelectMany.js';
import ProgressBar from '../../components/ProgressBar.js';
import axios from 'axios';

function InjuriesPage({setInputs, inputs, index, routes, handleRestart}) {
  const navigate = useNavigate();

  const handleNext = async () => {
    let bias = inputs.bias;
    choices.forEach((choice, index) => {
      if (choice && bias[index] === .5) {
        bias[index] = .25;
      }
    })
    let newInputs = inputs;
    newInputs.bias = bias;
    newInputs.splits = {};
    setInputs(newInputs);
    
    const response = await axios.get('http://localhost:3001/splits', { params: newInputs}).then((response) => {
      newInputs.splits = response.data;
      setInputs(newInputs);
    });

    navigate(routes[index + 1]);
  
    navigate(routes[index + 1]);
  }

  const options = ["Chest", "Back", "Legs", "Shoulders", "Biceps", "Triceps"];
  const [choices, setChoices] = useState(new Array(options.length).fill(false));
  return (
    <>
    <div>
      <div className="div-container">
        <h3> Which muscle groups would you like to emphasize less? </h3>
        <SelectMany options={options} choices={choices} setChoices={setChoices}></SelectMany>
      </div>
    </div>
    <div className="small-text-left" id="bottom-text">Select the muscle groups that you don't want to train. This may be due to an injury or just personal preference. This part is optional.</div>
    <ProgressBar index={index} routes={routes} handleNext={handleNext} handleRestart={handleRestart}></ProgressBar>
    </>
  )
}

export default InjuriesPage;