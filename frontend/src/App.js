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

import liftData from "./utils/staticData";

function App() {
  const [inputData, setInputData] = useState({}); 

  const [experience, setExperience] = useState('i');
  const [numberOfSets, setNumberOfSets] = useState(0);

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
  
  const inputRoutes = ['/experience', '/days', '/bias', '/injuries', '/base', '/split', '/style', '/sets', '/time', '/accessories', '/chest', '/back', '/legs', '/shoulders', '/biceps', '/triceps', '/horizontal-press', '/vertical-press', '/horizontal-pull', '/vertical-pull', '/knee-flexion', '/hip-extension', '/sign-up', 'loading']

  const handleRestart = () => {
    setInputData({});
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
        <Route path='/experience' element={
            <ExpPage setInputs={setInputData} inputs={inputData} index={0} routes={inputRoutes} setExperience={setExperience} handleRestart={handleRestart}></ExpPage>
        }></Route>
        <Route path='/days' element={
            <DaysPage setInputs={setInputData} inputs={inputData} index={1} routes={inputRoutes} handleRestart={handleRestart}></DaysPage>
        }></Route>
        <Route path='/bias' element={
            <BiasPage setInputs={setInputData} inputs={inputData} index={2} routes={inputRoutes} handleRestart={handleRestart}></BiasPage>
        }></Route>
        <Route path='/injuries' element={
            <InjuriesPage setInputs={setInputData} inputs={inputData} index={3} routes={inputRoutes} handleRestart={handleRestart}></InjuriesPage>
        }></Route>
        <Route path='/base' element={
            <BasePage setInputs={setInputData} inputs={inputData} index={4} routes={inputRoutes} handleRestart={handleRestart}></BasePage>
        }></Route>
        <Route path='/split' element={
            <SplitPage setInputs={setInputData} inputs={inputData} routes={inputRoutes} inputData={inputData} index={5} handleRestart={handleRestart}></SplitPage>
        }></Route>
        <Route path='/style' element={
            <StylePage setInputs={setInputData} inputs={inputData} index={6} routes={inputRoutes} handleRestart={handleRestart}></StylePage>
        }></Route>
        <Route path='/sets' element={
            <SetsPage setInputs={setInputData} inputs={inputData} index={7} routes={inputRoutes} setNumberOfSets={setNumberOfSets} handleRestart={handleRestart}></SetsPage>
        }></Route>
        <Route path='/time' element={
            <TimePage setInputs={setInputData} inputs={inputData} index={8} routes={inputRoutes} handleRestart={handleRestart}></TimePage>
        }></Route>
        <Route path='/accessories' element={
            <AccessoriesPage setInputs={setInputData} inputs={inputData} index={9} routes={inputRoutes} handleRestart={handleRestart}></AccessoriesPage>
        }></Route>
        <Route path='/chest' element={
            <ChestPage setInputs={setInputData} inputs={inputData} index={10} routes={inputRoutes} handleRestart={handleRestart}></ChestPage>
        }></Route>
        <Route path='/back' element={
            <BackPage setInputs={setInputData} inputs={inputData} index={11} routes={inputRoutes} handleRestart={handleRestart}></BackPage>
        }></Route>
        <Route path='/legs' element={
            <LegsPage setInputs={setInputData} inputs={inputData} index={12} routes={inputRoutes} handleRestart={handleRestart}></LegsPage>
        }></Route>
        <Route path='/horizontal-press' element={
            <HorizontalPress setInputs={setInputData} inputs={inputData} index={16} routes={inputRoutes} handleRestart={handleRestart}></HorizontalPress>
        }></Route>
        <Route path='/vertical-press' element={
            <VerticalPress setInputs={setInputData} inputs={inputData} index={17} routes={inputRoutes} handleRestart={handleRestart}></VerticalPress>
        }></Route>
        <Route path='/horizontal-pull' element={
            <HorizontalPull setInputs={setInputData} inputs={inputData} index={18} routes={inputRoutes} handleRestart={handleRestart}></HorizontalPull>
        }></Route>
        <Route path='/vertical-pull' element={
            <VerticalPull setInputs={setInputData} inputs={inputData} index={19} routes={inputRoutes} handleRestart={handleRestart}></VerticalPull>
        }></Route>
        <Route path='/knee-flexion' element={
            <KneeFlexion setInputs={setInputData} inputs={inputData} index={20} routes={inputRoutes} handleRestart={handleRestart}></KneeFlexion>
        }></Route>
        <Route path='/hip-extension' element={
            <HipExtension setInputs={setInputData} inputs={inputData} index={21} routes={inputRoutes} handleRestart={handleRestart}></HipExtension>
        }></Route>
        <Route path='/loading' element={
          <LoadingPage handleRestart={handleRestart}></LoadingPage>
        }>
          
        </Route>

        <Route path='/sign-up' element={
            <SignUp inputData={inputData} setRoutine={setRoutine} setUsername={setUsername} username={username}></SignUp>
        }></Route>
        <Route path='/login' element={
            <LoginPage setRoutine={setRoutine} setLog={setLog} setUsername={setUsername} setRecents={setRecents} setInputs={setInputData}>inputs={inputData} </LoginPage>
        }></Route>

        <Route path="/edit" element={
          <EditPage routine={routine} setRoutine={setRoutine} username={username} expIcon={experience} numberOfSets={numberOfSets} setLog={setLog} setRecents={setRecents}></EditPage>
        }></Route>
        <Route path="/workout" element={
        <WorkoutPage username={username} routine={routine.days} begin={begin} setBegin={setBegin} nextSet={nextSet} setNextSet={setNextSet} setLog={setLog} setLastRest={setLastRest} numberOfSets={numberOfSets} time={time} finished={finished} setFinished={setFinished} expIcon={experience} setRecents={setRecents} setNumber={setNumber} setSetNumber={setSetNumber} index={setIndex} setIndex={setSetIndex} recents={recents}
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
