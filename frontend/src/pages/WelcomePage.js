import React from 'react'
import { useNavigate } from 'react-router-dom';

function WelcomePage() {

  const navigate = useNavigate();

  return (
    <div className="input-page-body">
      <div className="div-container">
      <div className="center-div" style={{fontSize: '30px'}}> Welcome to More Weight! </div>
        <div className="center-div">
        <button className="button" id="welcome-button" onClick={() => navigate('/login')}>
          Returning User
        </button>
        <button className="button" id="welcome-button" onClick={() => navigate('/experience')}>
          New User
        </button>
        </div>
      </div>
    </div>
  )
}

export default WelcomePage
