import { Route,Link } from 'react-router-dom';
import styled from 'styled-components';

import './App.css';

const Container = styled.div`
  display: flex;
  justify-content: center;
  background-color: black;
  align-items: center;
  height:100vh;
`;
const Container_body = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width:50%;
  height:46%;
  background-color: #FFFFFF;
  border-radius: 40px;
  text-align: center;
`
const Login_Header = styled.div`
  font-size: 48px;
  font-style:normal;
  font-weight: 700;
  line-height: normal;
  margin-top: 5%;
`;
const Service_introduce = styled.div`
  color: #6D6D6D;
  font-size: 30px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;
const Login_button = styled.div`
  border-radius: 30px;
  background: #181818;
  text-align :center ;
  width: 90%;
  margin-bottom: 5%;
`;
const Login_link = styled.a`
  color: #FFF;
  font-size: 32px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  text-decoration: none;
`;

const CLIENT_ID = '941001632953-ja7dpvnsusm7r287su9top3otp939dla.apps.googleusercontent.com';
const REDIRECT_URI = 'http://localhost:8080/login/oauth2/code/google';

function App() {
  return (
    <Container>
      <Container_body>

   
          <Login_Header>
            로그인
            <Service_introduce>서비스 한줄 소개</Service_introduce>
          </Login_Header>
          

        
          <Login_button>
            <Login_link href={`https://accounts.google.com/o/oauth2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code&scope=https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile`}>
              <img src='devicon_google.png'></img>구글계정으로 로그인
            </Login_link>
          </Login_button>

        
               
      </Container_body>       
  </Container>
  );
}

export default App;
