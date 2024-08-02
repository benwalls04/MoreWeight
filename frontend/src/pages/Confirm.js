import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Confirm = ({ changeDayIndex, ids, weekdays}) => {

  const navigate = useNavigate();

  return (
    <>
      <div className="center-div">
        <h3> Are you sure you want to proceed? </h3>
      </div>
      <div className="center-div"> 
        <button className="button" style={{width: '200px', color: 'white'}} onClick={() => navigate('/extension')}>
          Make Changes 
        </button>
        <button className="button" style={{width: '200px', color: 'white'}} onClick={() => navigate('/sign-up')}>
          Finish 
        </button>
    </div> 
    </>
  );
};

export default Confirm;
