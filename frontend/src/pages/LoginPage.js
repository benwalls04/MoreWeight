import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import ErrorText from '../components/ErrorText';
import axios from "axios";

function Login({setRoutine, setLog, setRecents, setUsername, setInputs}) {
  const navigate = useNavigate();

  const [showError, setShowError] = useState(false);
  const [usernameText, setUsernameText] = useState('');
  const [password, setPassword] = useState('');
  const [errorText, setErrorText] = useState("Please enter a valid username and password.");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validInput(usernameText) && validInput(password)){
      try {
        const response = await axios.get('http://moreweight-api-v1.us-east-1.elasticbeanstalk.com/login', {
          params: { username: usernameText, password: password }
        });
        setRoutine(response.data.routine);
        setLog(response.data.log);
        setRecents(response.data.recents);
        setUsername(usernameText);
        setInputs(response.data.inputs);
        navigate('/profile');
      } catch (error) {
        setShowError(true);
        if (error.response && error.response.status === 400) {
          // Display the specific error message from the backend
          setErrorText(error.response.data.message);
        } else {
          setErrorText('Error'); 
        }
      }
    } else {
      setErrorText("Please enter a valid username and password.");
      setShowError(true);
    }
  }

  return (
    <>
    <div className="input-page-body" style={{ minHeight: '629px' }}>
      <div className="div-container">
      <h5> Login with your username and password </h5>
        <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username" style={{ fontSize: '20px'}}>Username:</label>
          <input
            className="credential-input"
            type="text"
            id="username"
            value={usernameText}
            style={{height: '50px', fontSize: '20px'}}
            onChange={(e) => setUsernameText(e.target.value)}
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
          <button className="button" id="sign-up-btn" type="submit">Log in</button>
        </div>
        </form>
      </div>
    </div>
    <ErrorText show={showError} text={errorText}></ErrorText>
    </>
  )

  function validInput(string) {
    const invalidCharacters = /\s|[\x00-\x1F\x7F-\x9F]/;
    const valid = usernameText.length > 0 && !invalidCharacters.test(string);
    return valid;
  }
  
}

export default Login;