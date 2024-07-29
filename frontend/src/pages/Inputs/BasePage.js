import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import ProgressBar from '../../components/ProgressBar';
import staticData from '../../utils/staticData';
import axios from "axios";


function BasePage({setInputs, inputs, index, routes, handleRestart }) {

  const sampleLines = staticData.splitSamples;
  const sampleTitles = staticData.splitTitles;

  const navigate = useNavigate();
  const [splits, setSplits] = useState(inputs.splits);

  const handleNext = async () => {
    if (choiceIndex > -1){
      const newSplits = {...splits};
        let [key, value] = Object.entries(splits.selection[choiceIndex])[0];
        newSplits.selection = value;
        setSplits(newSplits);
      if (Array.isArray(newSplits.selection[0])){
          navigate("/loading")
          let newInputs = {... inputs}
          const response = await axios.post('http://localhost:3001/partition', { splits: newSplits.selection });
          newSplits.selection = response.data;
          newInputs.splits = newSplits;
          setInputs(newInputs);
          navigate("/split");
        } 
    }
  };

  const [choiceIndex, setChoiceIndex] = useState(-1);
  const [ids, setIds] = useState(new Array(Object.entries(splits.selection).length).fill("split-entry"))

  const handleClick = (index, title) => {
    const newIds = new Array(Object.entries(splits.selection).length).fill("split-entry");
    newIds[index] = "split-entry-select";
    setIds(newIds);
    setChoiceIndex(index);
  };

  return (
    <>
    <div>
      <div className="div-container">
      <h3>Which routine base do you prefer?</h3>
      <div id="split-grid">
        {splits.selection.map((table, index) => {
          const [key, value] = Object.entries(table)[0];

          return (
            <button key={index} id={ids[index]} onClick={() => handleClick(index)}>
              <h4>{sampleTitles[key]}</h4>
              <div id="split-textbox">
                Example Split: 
                {getSampleLines(key).map((line, index) => (
                  <div className="small-text-left" key={index}>- {line}</div>
                ))}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  </div>
  <div id="bottom-text" className="small-text-left">
    Focus on the type of routine you want. The specific days may vary 
  </div>
  <ProgressBar index={index} routes={routes} handleNext={handleNext} handleRestart={handleRestart}></ProgressBar>
  </>
  );

  function getSampleLines(key) {
    if (!sampleLines[key]){
      return [];
    }

    const text = sampleLines[key];
    let lines = [];
    let index = 0;
    while (index < text.length){
      let line = "";
      while (index < text.length && text[index] !== '.'){
        line += text[index];
        index++;
      }
      lines.push(line);
      index++;
    }

    return lines;

  }
}

export default BasePage;