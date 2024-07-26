import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

function ProgressBar({ index, routes, handleNext, handleRestart}) {
  const [progress, setProgress] = useState(0); 

  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/');
    handleRestart();
  }

  useEffect(() => {
    setProgress((100 * index) / routes.length);
  }, [index, routes.length]);

  return (
    <div id="progress-container">
      <button id="progress-button" onClick={handleClick}>restart</button>
      <div id="progress-bar"  style={{ width: `${progress}%`}}></div>
      <button id="progress-button" onClick={handleNext}>next</button>
    </div>
  );
}

export default ProgressBar;