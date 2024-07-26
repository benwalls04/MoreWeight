import { useState } from 'react';

function Slider({ minLabel, maxLabel, value, setValue}) {
  return (
    <div className="div-container">
      <div id="slider-progress-container">
        <div id="slider-progress"  style={{ width: `${value}%`}}></div>
      </div>
      <input
        className="slider"
        type="range"
        min="0"
        max="100"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <div className="slider-labels">
        <div className="left-label">{minLabel}</div>
        <div className="right-label">{maxLabel}</div>
      </div>
    </div>
  )
}

export default Slider;