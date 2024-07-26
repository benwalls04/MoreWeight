import { useState } from "react";

const DayButtons = ({ changeDayIndex, ids, weekdays}) => {
  return (
    <div className="slant-button-grid">
      {ids.map((id, index) => (
        <button id={id} onClick={() => changeDayIndex(index)}>
          {weekdays[index]} 
        </button>
      ))}
    </div>
  );
};

export default DayButtons;
