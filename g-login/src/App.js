import { Route,Link } from 'react-router-dom';
import styled from 'styled-components';

import './App.css';

const Container = styled.div`
  display: flex;
  justify-content: center;
`;
const Login_button = styled.button`
  width:10vw;
  height:5vw;
  color:skyblue;
  font-weight: bold;
  cursor: pointer;
`;

const CLIENT_ID = '941001632953-ja7dpvnsusm7r287su9top3otp939dla.apps.googleusercontent.com';
const REDIRECT_URI = 'http://localhost:8080/login/oauth2/code/google';

function App() {
  return (
    <Container>
      
      <Login_button>
      <a href={`https://accounts.google.com/o/oauth2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code&scope=https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile`}>login</a>
      </Login_button>
    </Container>
  );
}

export default App;
