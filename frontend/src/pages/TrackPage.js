import React from 'react'
import FooterMenu from '../components/FooterMenu'
import { useState, useEffect, useRef } from 'react'
import axios from 'axios'

function TrackPage({ recents, log, liftData }) {

  const [searchText, setSearchText] = useState('Search')
  const [showSearch, setShowSearch] = useState(false);

  const [sortText, setSortText] = useState('recents')
  const [showSorts, setShowSorts] = useState(false);

  const groups = ['chest', 'back', 'legs', 'shoulders', 'biceps', 'triceps', 'accessories']
  const [choices, setChoices] = useState(new Array(groups.length).fill(true));

  const [logShown, setLogShown] = useState(recents);
  const [icons, setIcons] = useState(new Array(recents.length).fill('+'));

  const searchRef = useRef(null);
  const sortRef = useRef(null);
  

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSearch(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [searchRef]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sortRef.current && !sortRef.current.contains(event.target)) {
        setShowSorts(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [sortRef]);

  const handleSearch = (movement) => {
    setLogShown([movement]);
    setIcons(new Array(recents.length).fill('+'));
    setSearchText(movement);
    setShowSearch(false);
  }

  const handleChange = (e) => {
    setSearchText(e.target.value);
    setLogShown(recents.filter(entry => entry.title.includes(e.target.value)));
    setIcons(new Array(recents.length).fill('+'));
  }

  const handleFilter = (index) => {
    let newChoices = [...choices];
    newChoices[index] = !newChoices[index];
    setChoices(newChoices);
    let newLogShown = [...logShown];
    newLogShown = recents.filter(entry => {
      const entryGroup = liftData[2][entry.title].group;
      const groupIndex = groups.includes(entryGroup) ? groups.indexOf(entryGroup) : 6;
      return newChoices[groupIndex];
    });
    setLogShown(newLogShown);
    setIcons(new Array(recents.length).fill('+'));
  }

  const formatDate = (date) => {
    return date.slice(5, 7).concat('/', date.slice(8, 10), '/', date.slice(2, 4));
  }

  const changeDropdown = (index) => {
    let newIcons = [...icons];
    newIcons[index] = newIcons[index] === '+' ? '-' : '+';
    setIcons(newIcons);
  }

  return (
    <div className="page-body" style={{paddingTop: '20px'}}>
      <div className="shadow-header" style={{ height: '200px', position: 'fixed', top: '0px', left: '50%',  transform: 'translateX(-50%)', width: '450px', paddingTop: '20px' }}>
        <div className="center-div">
          <h2>Log</h2>
        </div>
        <div className="center-div" style={{ position: 'relative' }}>

          <input type="text" value={searchText} onClick={() => setShowSearch(true)} onChange={(e) => { handleChange(e) }} onBlur={() => { }} className="movement-title" style={{ border: '1px white solid', borderRadius: '4px', marginTop: '10px', marginBottom: '10px', paddingLeft: '10px', width: '250px' }}></input>

          <div id="sub-dropdown" style={{ display: showSearch ? 'grid' : 'none', position: 'absolute', top: '45px', left: '22px', width: '250px' }} ref={searchRef}>
            {Object.entries(log).filter(([key, logTable]) => logShown.includes(key)).map(([key, logTable]) => (
              <button id="sub-option" onClick={() => { handleSearch(key) }}>
                {key}
              </button>
            ))}
          </div>

          <div ref={sortRef} style={{ marginTop: '10px' }}>
            <button className="gray-button" id="log-icon" onClick={() => setShowSorts(true)}> Sort by {sortText} </button>
            <div id="sub-dropdown" style={{ display: showSorts ? 'grid' : 'none', position: 'absolute', top: '45px', left: '85px', width: '270px' }}>
            </div>
          </div>

        </div>
        <div className="center-div">
          <div className="slant-button-grid" style={{ marginBottom: '0px', marginTop: '10px', maxWidth: '400px' }}>
            {groups.slice(0, 4).map((group, index) => {
              return (
                <button className="slant-button" style={{ backgroundColor: choices[index] ? 'rgb(255, 95, 95)' : 'rgb(25, 25, 25)', borderColor: choices[index] ? 'rgb(25, 25, 25)' : 'rgb(255, 95, 95)' }} onClick={() => handleFilter(index)}>{group}</button>
              )
            })}
          </div>
        </div>
        <div className="center-div">
          <div className="slant-button-grid" style={{ marginBottom: '0px', marginTop: '0px', width: '400px' }}>
            {groups.slice(4, 7).map((group, index) => {
              index += 4;
              return (
                <button className="slant-button" style={{ backgroundColor: choices[index] ? 'rgb(255, 95, 95)' : 'rgb(25, 25, 25)', borderColor: choices[index] ? 'rgb(25, 25, 25)' : 'rgb(255, 95, 95)' }} onClick={() => handleFilter(index)}>{group}</button>
              )
            })}
          </div>
        </div>
      </div>
      <div style={{ paddingTop: '180px' }}>
        {logShown.map((movement, index) => {
          return (
            <div className="log-container">
              <div className="flexbox-row">
                <button className="expand-button" style={{ paddingRight: '10px', paddingLeft: '20px', marginTop: '-6px', height: '1px' }} onClick={() => { changeDropdown(index) }}>
                  {icons[index]}
                </button>
                <h5>{movement.title}</h5>
              </div>
              <div className="flexbox-row" style={{ display: icons[index] === '+' ? '' : 'none' }}>
                <div className="log-info">
                  <div>Date</div>
                  <div className="log-info-entry">{
                    log[movement.title].length > 0 ? formatDate(log[movement.title][0].createdAt) : 'NA'
                  }</div>
                </div>
                <div className="log-info">
                  <div>Weight</div>
                  <div className="log-info-entry">{
                    log[movement.title].length > 0 ? log[movement.title][0].weight : 'NA'
                  }</div>
                </div>
                <div className="log-info">
                  <div>Reps</div>
                  <div className="log-info-entry">{
                    log[movement.title].length > 0 ? log[movement.title][0].reps : 'NA'
                  }</div>
                </div>
                <div className="log-info">
                  <div>RPE</div>
                  <div className="log-info-entry">{
                    log[movement.title].length > 0 ? log[movement.title][0].RPE : 'NA'
                  }</div>
                </div>
              </div>
              <div src={movement.imageURL} style={{ height: '230px', width: '100%', marginBottom: '10px', display: icons[index] === '+' ? 'none' : ''}}>
                  <div className="center-div" style={{paddingTop: '100px'}}>Graphs coming soon!</div>
              </div>
              <div style={{ maxHeight: '130px', overflowY: 'auto' }}>
                <div style={{ display: icons[index] === '+' ? 'none' : 'grid', gridTemplateColumns: '1fr' }}>
                  {log[movement.title].map((entry, i) => {
                    return (
                      <div className="flexbox-row" style={{ marginBottom: '10px', marginTop: '5px' }}>
                        <div className="log-info">
                          <div>Date</div>
                          <div className="log-info-entry">{
                            formatDate(entry.createdAt)
                          }</div>
                        </div>
                        <div className="log-info">
                          <div>Weight</div>
                          <div className="log-info-entry">{
                            entry.weight
                          }</div>
                        </div>
                        <div className="log-info">
                          <div>Reps</div>
                          <div className="log-info-entry">{
                            entry.reps
                          }</div>
                        </div>
                        <div className="log-info">
                          <div>RPE</div>
                          <div className="log-info-entry">{
                            entry.RPE
                          }</div>
                        </div>
                        <button style={{ backgroundColor: 'rgb(25, 25, 25)', border: 'none', marginTop: '-10px', marginLeft: '20px' }}>
                          <img className="icon" src="media/footer-icons/pencil-icon.png" style={{ marginLeft: '0px' }}></img>
                        </button>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          )
        })}
      </div>
      <FooterMenu index={2} />
    </div>
  )
}

export default TrackPage
