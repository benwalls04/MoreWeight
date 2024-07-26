import { useState } from "react";
import { useNavigate } from "react-router-dom";

const FooterMenu = ({ index }) => {
  const navigate = useNavigate();
  let arr = ["profile-icon", "workout-icon", "track-icon"];
  arr[index] += "-select";
  return (
    <div className="button-arr">
      <button className="footer-button" onClick={() => navigate('/profile')}>
        <img
          className="footer-icon"
          src={"/media/footer-icons/" + arr[0] + ".png"}
        ></img>
      </button>
      <button className="footer-button" onClick={() => navigate('/workout')}>
        <img
          className="footer-icon"
          src={"/media/footer-icons/" + arr[1] + ".png"}
        ></img>
      </button>
      <button className="footer-button" onClick={() => navigate('/track')}>
        <img
          className="footer-icon"
          src={"/media/footer-icons/" + arr[2] + ".png"}
        ></img>
      </button>
    </div>
    
  );
};

export default FooterMenu;
