import React from 'react'
import FooterMenu from '../components/FooterMenu'
import RoutineInfo from '../components/RoutineInfo'
import Features from '../components/Features'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

function ProfilePage({username, routine, setSelections, selections, inputs}) {

  const navigate = useNavigate();

  const goal = inputs.style < 33? "Size" : inputs.style > 66? "Strength" : "Neutral";
  const weekdays = ['M', 'T', 'W', 'Th', 'F', 'Sa', 'Su'];
  const GROUP_NAMES = ["chest", "back", "legs", "shoulders", "biceps", "triceps"]
  
  //const dayIds = inputs.days.map((entry, index) => entry === true? 'select-day-2': 'unselect-day-2');
  /*        <div className="slant-button-grid" style={{width: '150px', height: '20px', marginLeft:'25px', marginTop: '4px'}}>
            {weekdays.map((day, index) => {
              return <button id={dayIds[index]} style={{fontSize: '10px', height: '20px', border: '1px white solid'}}>{day}</button>
            })}
          </div>
  */

  const changeIcon = () => {
    setIconClass(iconClass === 'expand-button'? 'close-button': 'expand-button');
    setIcon(icon === '+'? '-': '+');
  }

  const [iconClass, setIconClass] = useState('expand-button');
  const [icon, setIcon] = useState('+');
  const [features, setFeatures] = useState(false);

  return (
    <div className="page-body" style={{minHeight:'665px'}}> 
      <div className="shadow-header" style={{height: '140px'}}>
        <div className="center-div" style={{paddingTop: '0px', fontSize: '30px'}}>
          {username}
        </div>
        <div id="info-grid"> 
          <div>
            <div className="center-div"> Experience Level </div>
            <div className="center-div"> {inputs.exp === 'b'? 'Beggginer': inputs.exp === 'i'? 'Intermediate': 'Advanced'} </div>
          </div>
          <div>
            <div className="center-div"> Training goal </div>
            <div className="center-div"> {goal} </div>
          </div>
        </div>
      </div> 
      <div id="routine-info">
        <div className="center-grid" style={{marginBottom: '40px', marginTop: '0px'}}> 
          <button className="navigate-button" id={!features? "navigate-select" : ""} onClick={() => setFeatures(false)}>
            Routines
          </button>
          <button className="navigate-button" id={features? "navigate-select" : ""} onClick={() => setFeatures(true)}>
            Features
          </button>
          <button className="navigate-button">
            
          </button>
        </div>
        <div className="flexbox-row" style={{display: features? 'none': ''}}>
          <button className={iconClass} style={{marginTop: '-10px', marginRight: '15px'}} onClick={changeIcon}>{icon}</button>
          <div style={{marginTop:'-4px'}}> Routine #1 </div>
          <button style={{backgroundColor: 'rgb(25, 25, 25)', border: 'none', marginTop: '-12px'}} onClick={()=> navigate('/edit')}>
            <img className="icon" src="media/footer-icons/pencil-icon.png" style={{marginLeft: '0px'}}></img>
          </button>
        </div>
        <RoutineInfo routine={routine} weekdays={weekdays} show={icon === '+' || features? false: true}></RoutineInfo>
        <Features selections={selections} setSelections={setSelections} show={features} username={username}></Features>
      </div>
      <FooterMenu index={0} />
    </div>
  )
}

export default ProfilePage
