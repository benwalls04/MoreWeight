import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import SelectOne from '../../components/SelectOne.js';
import ProgressBar from '../../components/ProgressBar.js';
import Slider from '../../components/Slider.js';

function StylePage({inputs, setInputs, index, routes, handleRestart}) {
  const navigate = useNavigate();

  const handleNext = () => {
    let newInputs = {...inputs};
    newInputs.style = value;
    setInputs(newInputs); 
    navigate('/sets');
  }

  const [value, setValue] = useState(50);
  return (
    <>
    <div>
      <div className="div-container">
        <h1> What is your training goal? </h1>
        <Slider minLabel="size" maxLabel="strength" value={value} setValue={setValue}></Slider>
      </div>
    </div>
    <ProgressBar index={index} routes={routes} handleNext={handleNext} handleRestart={handleRestart}></ProgressBar>
    </>
  )
}

export default StylePage;