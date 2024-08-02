import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import SelectMany from '../../components/SelectMany.js';
import ProgressBar from '../../components/ProgressBar.js';
import axios from 'axios';

function BiasPage({setInputs, inputs, index, routes, setInitSelection}) {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate('/days')
  }

  const handleNext = async () => {
    let bias = choices.map(choice => choice ? .75 : .5);
    let newInputs = inputs;
    newInputs.bias = bias;
    newInputs.splits = {};
    setInputs(newInputs);
    
    navigate("/loading")
    const response = await axios.get('http://localhost:3001/splits', { params: newInputs}).then((response) => {
      newInputs.splits = response.data;
      setInitSelection(newInputs.splits.selection);
      setInputs(newInputs);
    });

    navigate('/base');
  }

  const options = ["Chest", "Back", "Legs", "Shoulders", "Biceps", "Triceps"];
  const [choices, setChoices] = useState(new Array(options.length).fill(false));
  return (
    <>
    <div>
      <div className="div-container">
        <div className="center-div">
          <h2> Which muscle groups would you like to bias? </h2>
        </div>
        <SelectMany options={options} choices={choices} setChoices={setChoices}></SelectMany>
      </div>
    </div>
    <div className="small-text-left" id="bottom-text">Select the muscle groups that you want to work on the most. This part is optional.</div>
    <ProgressBar index={index} routes={routes} handleNext={handleNext} handleBack={handleBack}></ProgressBar>
    </>
  )
}

export default BiasPage;