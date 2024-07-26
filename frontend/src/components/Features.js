import React from 'react'
import SelectOne from '../components/SelectOne.js';
import { useState } from 'react';
import axios from 'axios';

function Features({selections, setSelections, show, username}) {
  const titles = ['Survey based on experience', 'Better movement sequences', 'Graphs', 'Cycle splits', 'Advanced intensity techniques', 'Edit workout before starting', 'Images and  instructions', 'Supersets', 'Auto update routine after missed days', 'Create and track your own movements', 'Manually create routine', 'Better default rep ranges / rest times', 'Improve routine generation', 'Improve clarity or ease of use', 'Imrpove UI', 'Fix bugs'];
  const altText = ['Change the input survey based on experience level. A begginer would be met with less questions, less lifting terminology, more assistance creating a split, and less flexibility. An advanced lifter would be met with the opposite funcitonalities', 'Select this option if the default workouts arent comprised of movements you like to do or are in an order you wouldnt do them in. (explain in the text box below)', 'Display progress visually using graphs.', 'Create splits that dont depend on the day of the week. Instead, these splits would cycle through a rotation of days, and the workout you do is dependant soley on what workout you did last', 'Give the option to program dropsets, assisted reps, partial reps, etc.', 'Allow you to edit the movements, sets, reps, weight, order of movements before starting a workout in case you want to deviate from your normal routine', 'Add images and instructions for each movement to assist with form', 'Give the option to program supersets', 'If you miss a workout, the next time you go to workout the routine will automatically adjust and generate a temporary workout to get you back on track in a way that optimizes for both volume and recovery', 'Allow you to manually type in your own movements in case our predefined set of movements dont have your favorite movements', 'Provide an option to hand craft your own routine from scratch if the personalized rotuine builder doesnt fit your needs', 'Seelct this option if you do not like either the default rep ranges or default rest times for a large number of movements (explain in the text box below)', 'Select this option if you werent happy with the routine that was generated for you (explain in the text box below)', 'Select this option if you found the app hard to use or confusing (explain in the text box below)', 'Select this option if you found the app ugly or messy or could improve from some design changes (explain in the text box below)', 'Select this option if you found any bugs in the app (explain in the text box below)']; 
  const [text, setText] = useState('');
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const submit = async () => {
    await axios.post('http://moreweight-api-v1.us-east-1.elasticbeanstalk.com/submit-features', { username, selections, text});
  }

  const changeSelection = (index) => {
    let newSelections = [...selections];
    if (newSelections.includes(index)) {
      newSelections.splice(newSelections.indexOf(index), 1);
    } else if (newSelections.length < 4){
       newSelections.push(index);
    }
    setSelections(newSelections);
  }

  return (
    <div style={{display: show? '': 'none', marginTop: '-20px', paddingBottom: '30px', maxWidth: '400px'}}>
      <div style={{marginBottom: '10px', fontSize: '14px'}}>
        Please select up to 4 feautures you would like to see most in the next version, and feel free to specify anything else in the text box below. If your on a computer you can hover over buttons for clarification (I know these captions don't make much sense). Thanks.
      </div>
      <div className="center-div">
        <div id="feature-grid">
        {
          titles.map((title, index) => {
            return (
              <button className={selections.includes(index)? 'select-button': 'button'} style={{width: '90%'}} onClick={() => changeSelection(index)} onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}>
                {title}
              </button>
            )
          })
        }
        </div>
      </div>
      <div className="center-div" style={{ marginTop: '10px' }}>
        <textarea
          readOnly
          value={hoveredIndex !== null ? altText[hoveredIndex] : ''}
          className="alt-text"
          style={{
            width: '100%',
            height: '80px',
            fontSize: '12px',
            borderRadius: '4px',
            border: 'none',
            padding: '10px',
            backgroundColor: 'rgb(25, 25, 25)',
            color: 'white'
          }}
        ></textarea>
      </div>
      <div className="center-div">
        <input type="text" value={text} onChange={(e) => setText(e.target.value)} onBlur={() => { }} className="movement-title" style={{ border: '1px white solid', borderRadius: '4px', marginTop: '10px', marginBottom: '10px', paddingLeft: '10px', width: '428px', height: '40px' }}></input>
      </div>
      <div className="center-div">
        <button style={{width: '428px', height: '40px', color: 'white'}} className="select-button" onClick={() => submit()}> Submit </button>
      </div>
    </div>
  )
}

export default Features
