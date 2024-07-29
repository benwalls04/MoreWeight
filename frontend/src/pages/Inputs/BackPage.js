import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import SelectOne from '../../components/SelectOne.js';
import ProgressBar from '../../components/ProgressBar.js';
import Slider from '../../components/Slider.js';

function BackPage({inputs, setInputs, index, routes, handleRestart}) {
  const navigate = useNavigate();

  const handleNext = () => {
    let newInputs = {...inputs};
    newInputs.back = parseInt(value);
    setInputs(newInputs);
    navigate('/legs');
  }

  const [value, setValue] = useState(50);
  return (
    <>
    <div>
      <div className="div-container">
        <h2> What region of the back would you like to bias? </h2>
        <Slider minLabel="lats" maxLabel="upper back" value={value} setValue={setValue}></Slider>
      </div>
    </div>
    <ProgressBar index={index} routes={routes} handleNext={handleNext} handleRestart={handleRestart}></ProgressBar>
    </>
  )
}

export default BackPage;