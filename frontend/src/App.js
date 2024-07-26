import './App.css';
import { useEffect , useState } from 'react'
import "bootstrap/dist/css/bootstrap.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import BasePage from './pages/Inputs/BasePage';
import SplitPage from './pages/Inputs/SplitPage';
import RoutinePage from "./pages/RoutinePage";
import WorkoutPage from "./pages/WorkoutPage";
import TrackPage from "./pages/TrackPage";
import ProfilePage from "./pages/ProfilePage";
import DaysPage from './pages/Inputs/DaysPage';
import ExpPage from './pages/Inputs/ExpPage';
import StylePage from './pages/Inputs/StylePage';
import SetsPage from './pages/Inputs/SetsPage';
import TimePage from './pages/Inputs/TimePage';
import BiasPage from './pages/Inputs/BiasPage';
import InjuriesPage from './pages/Inputs/InjuriesPage';
import AccessoriesPage from './pages/Inputs/AccesoriesPage';
import ChestPage from './pages/Inputs/ChestPage';
import BackPage from './pages/Inputs/BackPage';
import LegsPage from './pages/Inputs/LegsPage';
import ShouldersPage from './pages/Inputs/ShouldersPage';
import BicepsPage from './pages/Inputs/BicepsPage';
import TricepsPage from './pages/Inputs/TricepsPage';
import HorizontalPress from './pages/Inputs/HorizontalPress';
import VerticalPress from './pages/Inputs/VerticalPress';
import HorizontalPull from './pages/Inputs/HorizontalPull';
import VerticalPull from './pages/Inputs/VerticalPull';
import KneeFlexion from './pages/Inputs/KneeFlexion';
import HipExtension from './pages/Inputs/HipExtension';
import SignUp from './pages/SignUp';
import LoginPage from './pages/LoginPage';
import WelcomePage from './pages/WelcomePage';
import EditPage from './pages/EditPage';
import LoadingPage from './pages/LoadingPage';

import liftData from "./utils/liftData";

function App() {
  const [inputData, setInputData] = useState({}); 

  const updateInputData = (entry, index) => {
    let newInputs = inputData;
    newInputs[keys[index]] = entry;
    setInputData(newInputs)
  }

  const [expIcon, setExpIcon] = useState('i');
  const [numberOfSets, setNumberOfSets] = useState(0);

  const [outputData, setOutputData] = useState({});
  const updateOutputData = (entry, index) => {
    let newOutputs = outputData;
    newOutputs[outputKeys[index]] = entry;
    setOutputData(newOutputs);
  }

  const [routine, setRoutine] = useState([]);
  const [log, setLog] = useState([]);
  const [recents, setRecents] = useState([]);
  const [username, setUsername] = useState('');

  const [begin, setBegin] = useState(false);
  const [finished, setFinished] = useState(true);
  const [nextSet, setNextSet] = useState({});
  const [setNumber, setSetNumber] = useState(1);
  const [setIndex, setSetIndex] = useState(0);
  const [lastRest, setLastRest] = useState(0);

  const [time, setTime] = useState(lastRest);
  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(prevTime => {
        if (prevTime <= .016) {
          clearInterval(intervalId);
          return 0;
        }
        return prevTime - .016667;
      });
    }, 1000);

    return () => clearInterval(intervalId); 
  }, [lastRest]);

  useEffect(() => {
    setTime(lastRest);
  }, [lastRest])
  
  const inputRoutes = ['/days', '/experience', '/style', '/sets', '/time' , '/bias', '/injuries', '/accesories', '/base', '/split', '/chest', '/back', '/legs', '/shoulders', '/biceps', '/triceps', '/horizontal-press', '/vertical-press', '/horizontal-pull', '/vertical-pull', '/knee-flexion', '/hip-extension', '/sign-up', 'loading']

  const keys = ['days', 'experience', 'style', 'sets', 'time', 'bias', 'injuries', 'accesories', 'base', 'split', 'chest', 'back', 'legs', 'shoulders', 'biceps', 'triceps', 'horizontal-press', 'vertical-press', 'horizontal-pull', 'vertical-pull', 'knee-flexion', 'hip-extension'
  ]

  const outputKeys = ['splits', 'split', 'routine']

  const handleRestart = () => {
    setInputData({});
    setOutputData({});
  }
  
  const [selections, setSelections] = useState([]);

  useEffect(() => {
    setNumberOfSets(inputData.sets);
  }, [inputData])

  return (
    <div style={{width: '90%', maxWidth: '400px'}}>
    <Router>
      <Routes>
        <Route path='/' element={
          <WelcomePage></WelcomePage>
        }></Route>
        <Route path='/days' element={
            <DaysPage updateInputs={(entry, index) => updateInputData(entry, index)} index={0} routes={inputRoutes} handleRestart={handleRestart}></DaysPage>
        }></Route>
        <Route path='/experience' element={
            <ExpPage updateInputs={(entry, index) => updateInputData(entry, index)} index={1} routes={inputRoutes} setExpIcon={setExpIcon} handleRestart={handleRestart}></ExpPage>
        }></Route>
        <Route path='/style' element={
            <StylePage updateInputs={(entry, index) => updateInputData(entry, index)} index={2} routes={inputRoutes} handleRestart={handleRestart}></StylePage>
        }></Route>
        <Route path='/sets' element={
            <SetsPage updateInputs={(entry, index) => updateInputData(entry, index)} index={3} routes={inputRoutes} setNumberOfSets={setNumberOfSets} handleRestart={handleRestart}></SetsPage>
        }></Route>
        <Route path='/time' element={
            <TimePage updateInputs={(entry, index) => updateInputData(entry, index)} index={4} routes={inputRoutes} handleRestart={handleRestart}></TimePage>
        }></Route>
        <Route path='/bias' element={
            <BiasPage updateInputs={(entry, index) => updateInputData(entry, index)} index={5} routes={inputRoutes} handleRestart={handleRestart}></BiasPage>
        }></Route>
        <Route path='/injuries' element={
            <InjuriesPage updateInputs={(entry, index) => updateInputData(entry, index)} index={6} routes={inputRoutes} handleRestart={handleRestart}></InjuriesPage>
        }></Route>
        <Route path='/accesories' element={
            <AccessoriesPage updateInputs={(entry, index) => updateInputData(entry, index)} index={7} routes={inputRoutes} inputs={inputData} updateOutputs={(entry, index) => updateOutputData(entry, index)} outputIndex={0} handleRestart={handleRestart}></AccessoriesPage>
        }></Route>
        <Route path='/base' element={
            <BasePage outputData={outputData} updateInputs={(entry, index) => updateInputData(entry, index)} index={8} routes={inputRoutes} handleRestart={handleRestart}></BasePage>
        }></Route>
        <Route path='/split' element={
            <SplitPage updateInputs={(entry, index) => updateInputData(entry, index)} updateOutputs={(entry, index) => updateOutputData(entry, index)} outputIndex={1} routes={inputRoutes} inputData={inputData} index={9} handleRestart={handleRestart}></SplitPage>
        }></Route>
        <Route path='/chest' element={
            <ChestPage updateInputs={(entry, index) => updateInputData(entry, index)} index={10} routes={inputRoutes} handleRestart={handleRestart}></ChestPage>
        }></Route>
        <Route path='/back' element={
            <BackPage updateInputs={(entry, index) => updateInputData(entry, index)} index={11} routes={inputRoutes} handleRestart={handleRestart}></BackPage>
        }></Route>
        <Route path='/legs' element={
            <LegsPage updateInputs={(entry, index) => updateInputData(entry, index)} index={12} routes={inputRoutes} handleRestart={handleRestart}></LegsPage>
        }></Route>
        <Route path='/shoulders' element={
            <ShouldersPage updateInputs={(entry, index) => updateInputData(entry, index)} index={13} routes={inputRoutes} handleRestart={handleRestart}></ShouldersPage>
        }></Route>
        <Route path='/biceps' element={
            <BicepsPage updateInputs={(entry, index) => updateInputData(entry, index)} index={14} routes={inputRoutes} handleRestart={handleRestart}></BicepsPage>
        }></Route>
        <Route path='/triceps' element={
            <TricepsPage updateInputs={(entry, index) => updateInputData(entry, index)} index={15} routes={inputRoutes} handleRestart={handleRestart}></TricepsPage>
        }></Route>
        <Route path='/horizontal-press' element={
            <HorizontalPress updateInputs={(entry, index) => updateInputData(entry, index)} index={16} routes={inputRoutes} handleRestart={handleRestart}></HorizontalPress>
        }></Route>
        <Route path='/vertical-press' element={
            <VerticalPress updateInputs={(entry, index) => updateInputData(entry, index)} index={17} routes={inputRoutes} handleRestart={handleRestart}></VerticalPress>
        }></Route>
        <Route path='/horizontal-pull' element={
            <HorizontalPull updateInputs={(entry, index) => updateInputData(entry, index)} index={18} routes={inputRoutes} handleRestart={handleRestart}></HorizontalPull>
        }></Route>
        <Route path='/vertical-pull' element={
            <VerticalPull updateInputs={(entry, index) => updateInputData(entry, index)} index={19} routes={inputRoutes} handleRestart={handleRestart}></VerticalPull>
        }></Route>
        <Route path='/knee-flexion' element={
            <KneeFlexion updateInputs={(entry, index) => updateInputData(entry, index)} index={20} routes={inputRoutes} handleRestart={handleRestart}></KneeFlexion>
        }></Route>
        <Route path='/hip-extension' element={
            <HipExtension updateInputs={(entry, index) => updateInputData(entry, index)} index={21} routes={inputRoutes} handleRestart={handleRestart}></HipExtension>
        }></Route>
        <Route path='/loading' element={
          <LoadingPage handleRestart={handleRestart}></LoadingPage>
        }>
          
        </Route>

        <Route path='/sign-up' element={
            <SignUp inputData={inputData} outputData={outputData} setRoutine={setRoutine} setUsername={setUsername} username={username}></SignUp>
        }></Route>
        <Route path='/login' element={
            <LoginPage setRoutine={setRoutine} setLog={setLog} setUsername={setUsername} setRecents={setRecents} setInputs={setInputData}></LoginPage>
        }></Route>

        <Route path="/edit" element={
          <EditPage routine={routine} setRoutine={setRoutine} username={username} expIcon={expIcon} numberOfSets={numberOfSets} setLog={setLog} setRecents={setRecents}></EditPage>
        }></Route>
        <Route path="/routine" element={
        <RoutinePage outputData={outputData} 
        />} />
        <Route path="/workout" element={
        <WorkoutPage username={username} routine={routine.days} begin={begin} setBegin={setBegin} nextSet={nextSet} setNextSet={setNextSet} setLog={setLog} setLastRest={setLastRest} numberOfSets={numberOfSets} time={time} finished={finished} setFinished={setFinished} expIcon={expIcon} setRecents={setRecents} setNumber={setNumber} setSetNumber={setSetNumber} index={setIndex} setIndex={setSetIndex} recents={recents}
        />} />
        <Route path="/track" element={
        <TrackPage recents={recents} log={log} liftData={liftData} 
        />} />
        <Route path="/profile" element={
            <ProfilePage routine={routine} username={username} selections={selections} setSelections={setSelections} inputs={inputData}></ProfilePage>} 
        />
      </Routes>
    </Router>
    </div>
  );
}

export default App;
