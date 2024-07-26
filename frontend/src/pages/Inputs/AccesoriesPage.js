import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import SelectMany from '../../components/SelectMany.js';
import ProgressBar from '../../components/ProgressBar.js';
import axios from "axios";

function AccesoriesPage({updateInputs, index, routes, inputs, outputIndex, updateOutputs, handleRestart}) {
  const navigate = useNavigate();

  const partitionSplits = async () => {
    const response = await axios.get('http://moreweight-api-v1.us-east-1.elasticbeanstalk.com/splits', { params: inputs}).then((response) => {
      updateOutputs(response.data, outputIndex);
    });
    navigate(routes[index + 1]);
  }

  const handleNext = () => {
    navigate('/loading');
    updateInputs(choices, index);
    partitionSplits();
  }

  const options = ["Calves", "Abs", "Traps", "Side Deltoids", "Rear Deltoids", "Forearms"];
  const [choices, setChoices] = useState(new Array(options.length).fill(false));

  return (
    <>
    <div>
      <div className="div-container">
        <h2> Which accessory groups would you like to work on? </h2>
        <SelectMany options={options} choices={choices} setChoices={setChoices}></SelectMany>
      </div>
    </div>
    <div className="small-text-left" id="bottom-text">Select the accessory groups that you would like to train. These groups will be trained at the end of the workout if time allows for it. This part is optional.</div>
    <ProgressBar index={index} routes={routes} handleNext={handleNext} handleRestart={handleRestart}></ProgressBar>
    </>
  )

  function getRndInputs(){
    const keys = ['days', 'experience', 'style', 'sets', 'time', 'bias', 'injuries', 'accesories'];
    const dayOptions = ['3', '4', '5', '6', '7']
    const setsOptions = ['2', '3', '4']
    const timeOptions = ['30', '45', '60', '75', '90', '105', '120']
    const groups = ['Chest', 'Back', 'Legs', 'Shoulders', 'Biceps', 'Triceps']

    const numDays = dayOptions[Math.floor(Math.random() * dayOptions.length)];
    const days = new Array(7).fill('false');
    for (let i = 0; i < numDays; i++){
      let index = Math.floor(Math.random() * 7);
      while (days[index] === 'true'){
        index = Math.floor(Math.random() * 7);
      }
      days[index] = 'true';
    }

    const experience = Math.floor(Math.random() * 5).toString();
    const style = Math.floor(Math.random() * 100).toString();
    const sets = setsOptions[Math.floor(Math.random() * setsOptions.length)];
    const time = timeOptions[Math.floor(Math.random() * timeOptions.length)];

    const numBias = Math.floor(Math.random() * 6);
    let bias = [false, false, false, false, false, false];
    for (let i = 0; i < numBias; i++){
      let index = Math.floor(Math.random() * groups.length);
      while (bias[index] === 'true'){
        index = Math.floor(Math.random() * groups.length);
      }
      bias[index] = true;
    }

    let numAvoid = Math.floor(Math.random() * 6);
    numAvoid = Math.min(numAvoid, 6 - numBias)
    let avoid = [false, false, false, false, false, false];
    for (let i = 0; i < numAvoid; i++){
      let index = Math.floor(Math.random() * groups.length);
      while (bias[index] || avoid[index] ){
        index = Math.floor(Math.random() * groups.length);
      }
      avoid[index] = true;
    }

    const numAccessories = Math.floor(Math.random() * 6);
    let accessories = [false, false, false, false, false, false];
    for (let i = 0; i < numAccessories; i++){
      let index = Math.floor(Math.random() * groups.length);
      while (accessories[index]){
        index = Math.floor(Math.random() * groups.length);
      }
      accessories[index] = true;
    }

    return {
      days: days,
      experience: experience,
      style: style,
      sets: sets,
      time: time + ' mins',
      bias: bias,
      injuries: avoid,
      accesories: accessories
    }
  }
}

export default AccesoriesPage;