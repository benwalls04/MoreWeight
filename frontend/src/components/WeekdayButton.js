import { useState, useEffect } from "react";

const WeekdayButton = ({ day, dayStates, updateDays, index }) => {
  const [id, setId] = useState("");

  const handleClick = () => {
    updateDays(dayStates, index);
  };

  useEffect(() => {
    if (dayStates[index]) {
      setId("select-button");
    } else {
      setId("");
    }
  }, [dayStates[index]]);

  return (
    <button
      className="day-button btn btn-outline-danger"
      id={id}
      onClick={handleClick}
    >
      {day}
    </button>
  );
};

export default WeekdayButton;
