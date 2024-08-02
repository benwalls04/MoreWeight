import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import SelectOne from '../../components/SelectOne.js';
import ProgressBar from '../../components/ProgressBar.js';
import Slider from '../../components/Slider.js';

function LegsPage({inputs, setInputs, index, routes}) {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate('/back');
  }

  const handleNext = () => {
    let newInputs = {...inputs};
    newInputs.legs = parseInt(value);
    setInputs(newInputs);
    navigate('/horizontal-press');
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
    <ProgressBar index={index} routes={routes} handleNext={handleNext} handleBack={handleBack}></ProgressBar>
    </>
  )
}

export default LegsPage;