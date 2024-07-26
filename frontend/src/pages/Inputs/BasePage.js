import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import ProgressBar from '../../components/ProgressBar';
import ErrorText from '../../components/ErrorText';
import axios from "axios";

function BasePage({ outputData, updateInputs, index, routes, handleRestart }) {

  const navigate = useNavigate();
  const [splits, setSplits] = useState(outputData.splits);

  const handleNext = async () => {
    if (choiceIndex > -1){
      const response = await axios.post('http://moreweight-api-v1.us-east-1.elasticbeanstalk.com/partition', { splits: splits[choiceIndex].splits });
      updateInputs(response.data, index);
      if (response.data[0].base.length > 0){
        setSplits(response.data);
      } else {
        navigate(routes[index + 1]);
      }
    }
  };

  const [choiceIndex, setChoiceIndex] = useState(-1);
  const [ids, setIds] = useState(new Array(splits.length).fill("split-entry"))

  const handleClick = (index, title) => {
    const newIds = new Array(splits.length).fill("split-entry");
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
        {Object.values(splits).map((splitTable, index) => (
          <button key={index} id={ids[index]} onClick={() => handleClick(index)}>
            <h4 id={"split-header"}>
              {'title' in splitTable? splitTable.title: "Option " + (index + 1)}
            </h4>
            <div id="split-textbox">
              Example Split: 
              {getSampleLines(splitTable.sample).map((line, index) => {
                return <div className="small-text-left" key={index}>- {line}</div>
              })}
            </div>
          </button>
        ))}
      </div>
    </div>
  </div>
  <div id="bottom-text" className="small-text-left">
    Focus on the type of routine you want. The specific days may vary 
  </div>
  <ProgressBar index={index} routes={routes} handleNext={handleNext} handleRestart={handleRestart}></ProgressBar>
  </>
  );

  function getSampleLines(text) {
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