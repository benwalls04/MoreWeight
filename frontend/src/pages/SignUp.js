import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import ErrorText from '../components/ErrorText';
import axios from "axios";

function SignUp({inputData, setRoutine, username, setUsername}) {

  
  const navigate = useNavigate();

  const [showError, setShowError] = useState(false);
  const [password, setPassword] = useState('');
  const [errorText, setErrorText] = useState("Please enter a valid username and password.");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validInput(username) && validInput(password)){
      try {
        await axios.post('http://localhost:3001/new-user', {inputs: inputData, username: username, password: password}).then(response => {
          setRoutine(response.data);
          setUsername(username);
          navigate('/edit');
        })
      } catch (error) {
        if (error.response && error.response.status === 400) {
          setErrorText(error.response.data.message); 
        } else {
          setErrorText('Error');
        }
        setShowError(true);
      }
    } else {
      setErrorText("Please enter a valid username and password.");
      setShowError(true);
    }
  }

  return (
    <>
    <div>
      <div className="div-container">
        <h5> Your personalized routine is ready! Please create an account to continue.</h5>
        <div className="small-text-left"> We reccomend you write this down, as this version currently has no way to recover lost accounts. </div>
        <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username" style={{ fontSize: '20px'}}>Username:</label>
          <input
            className="credential-input"
            type="text"
            id="username"
            value={username}
            style={{height: '50px', fontSize: '20px'}}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password" style={{ fontSize: '20px'}}>Password:</label>
          <input
            className="credential-input"
            type="password"
            id="password"
            value={password}
            style={{height: '50px', fontSize: '20px'}}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="center-div">
          <button className="button" id="sign-up-btn" type="submit">Sign Up</button>
        </div>
        </form>
      </div>
    </div>
    <ErrorText show={showError} text={errorText}></ErrorText>
    </>
  )

  function validInput(string) {
    const invalidCharacters = /\s|[\x00-\x1F\x7F-\x9F]/;
    const valid = string.length > 0 && !invalidCharacters.test(string);
    return valid;
  }
  
}

export default SignUp;