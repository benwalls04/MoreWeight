import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import SelectOne from '../../components/SelectOne.js';
import ProgressBar from '../../components/ProgressBar.js';
import Slider from '../../components/Slider.js';

function StylePage({inputs, setInputs, index, routes, lastSplits, setLastSplits}) {
  
  const navigate = useNavigate();

  const handleBack = () => {
    let newInputs = {...inputs};
    let lastSplits2 = [...lastSplits];
    newInputs.splits.selection = lastSplits2.pop();
    setLastSplits(lastSplits2);
    setInputs(newInputs);
    navigate('/split')
  }

  const handleNext = () => {
    let newInputs = {...inputs};
    newInputs.style = parseInt(value) > 66? 'p': parseInt(value) > 33? 'b': 'n';
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
    <ProgressBar index={index} routes={routes} handleNext={handleNext} handleBack={handleBack}></ProgressBar>
    </>
  )
}

export default StylePage;