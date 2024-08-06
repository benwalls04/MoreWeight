import React from 'react'
import FooterMenu from '../components/FooterMenu'
import { useState, useEffect } from 'react'
import axios from 'axios'
import staticData from '../utils/staticData'

function SetPage({username, nextSet, setNumber, numberOfSets, setLog, getNextSet, time, setRecents, recents}) {

  const lowerBound = nextSet.lowerRep
  const upperBound = nextSet.upperRep
  const notes = [];

  function getTimeStr(time) {
    let minutes = Math.floor(time);
    let seconds = Math.floor((time - minutes) * 60); 
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`
  }

  const [entryText, setEntryText] = useState([0, 0, nextSet.RPE]);
  const getWeight = async () => {
    const response = await axios.get('http://moreweight-api-v1.us-east-1.elasticbeanstalk.com/get-last', {
      params: { username: username, movement: nextSet.movement, numberOfSets: numberOfSets }
    });
    return [response.data.weight, response.data.reps];
  }

  useEffect(() => {
    const fetchData = async () => {
      const [weight, reps] = await getWeight();
      setEntryText([weight, reps, nextSet.RPE]);
    };
    fetchData();
  }, [username, nextSet.movement, numberOfSets, nextSet.RPE]);

  const handleChange = (e, index) => {
    let newEntryText = [...entryText];
    newEntryText[index] = e.target.value;
    setEntryText(newEntryText);
  }

  const handleBlur = (text, index) => {
    let newEntryIds = [...entryIds];
    let newEntryText = [...entryText];
    newEntryText[index] = text.target.value;
    newEntryIds[index] = 'track-input';

    setEntryIds(newEntryIds);
    setEntryText(newEntryText);
  }

  const logSet = async () => {
    const response = await axios.post('http://moreweight-api-v1.us-east-1.elasticbeanstalk.com/log-set', {
      username: username,
      movement: nextSet.movement,
      weight: entryText[0],
      reps: entryText[1],
      RPE: entryText[2],
    });
    setLog(response.data.log);

    const newRecents = [...recents];
    const topIndex = newRecents.findIndex(entry => entry === nextSet.movement);
    const topEntry = newRecents.splice(topIndex, 1)[0];

    newRecents.unshift(topEntry);
    setRecents(newRecents);
    
    getNextSet();
    const [nextWeight, nextReps] = await getWeight();
    setEntryText([nextWeight, nextReps, nextSet.RPE]);
    setEntryIds(['default-input', 'default-input', 'default-input']);
  }
  
  const [entryIds, setEntryIds] = useState(['default-input', 'default-input', 'default-input'])

  return (
    <div>
      <div className="flexbox-column" style={{marginTop: '20px'}}>
        <div style={{marginBottom: '-10px', minHeight: '20px'}}>{staticData.movements[nextSet.movement].variants[nextSet.bias]}</div>
        <h2>{nextSet.movement}</h2>
        <div className="center-grid" style={{width: '300px', marginBottom:'30px'}}>
          <div className="gray-button" id="set-info-tag">Set {setNumber}/{numberOfSets}</div>
          <div className="gray-button" id="set-info-tag">{lowerBound} - {upperBound} reps</div>
          <div className="gray-button" id="set-info-tag">RPE {nextSet.RPE}</div>
        </div>  
        <div id={time === 0? 'timer-container-go': 'timer-container'} style={{marginBottom: '30px'}}>
          <div style={{fontSize:'50px'}}>{getTimeStr(time)}</div>
        </div>
        <div className="flexbox-row" style={{border: '2px solid gray', borderRadius:'6px', padding:'6px', maxWidth: '400px', height: '60px', alignItems:'center'}}>
          <div id="track-entry">
            Weight: <input id={entryIds[0]} type="number" value={entryText[0]} min={"0"} step="5" onChange={(e) => handleChange(e, 0)} onBlur={(e) => handleBlur(e, 0)}/> 
          </div>
          <div id="track-entry">
            Reps: <input id={entryIds[1]} type="number" value={entryText[1]} min="0" onChange={(e) => handleChange(e, 1)} onBlur={(e) => handleBlur(e, 1)} />
          </div>
          <div id="track-entry">
            RPE: <input id={entryIds[2]} type="number" value={entryText[2]} min="0" max="11" onChange={(e) => handleChange(e, 2)} onBlur={(e) => handleBlur(e, 2)} />
          </div>
        </div>
        <button id="slant-button" className="button" onClick={() => logSet()}style={{marginTop:'-8px', width: '100px'}}>
            log set
        </button>
        <div style={{borderBottom: '1px solid gray', height: '130px'}}>
          {notes.map((line) => {
            return <div className="small-text-left">{line}</div>
          })}
        </div>
      </div>
      <FooterMenu index={1}/>
    </div>
  )
}

export default SetPage
