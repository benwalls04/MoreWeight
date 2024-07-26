import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import SelectOne from '../../components/SelectOne.js';
import ProgressBar from '../../components/ProgressBar.js';
import Slider from '../../components/Slider.js';

function LegsPage({updateInputs, index, routes, handleRestart}) {
  const navigate = useNavigate();

  const handleNext = () => {
    updateInputs(value, index); 
    navigate(routes[index + 1]);
  }

  const [value, setValue] = useState(50);
  return (
    <>
    <div>
      <div className="div-container">
        <h2> What region of the legs would you like to bias? </h2>
        <Slider minLabel="hamstrings" maxLabel="quads" value={value} setValue={setValue}></Slider>
      </div>
    </div>
    <ProgressBar index={index} routes={routes} handleNext={handleNext} handleRestart={handleRestart}></ProgressBar>
    </>
  )
}

export default LegsPage;