import React ,{useState, createContext, useEffect}from 'react';
import './App.css';
import './MyPage.js';
import Home from './Home.js';
import MyPage from './MyPage.js';
import { BrowserRouter as Router, Routes,Route } from 'react-router-dom';
import EditProfile from './EditProfile'; 
import axios from 'axios';
import {atom, useRecoilState, RecoilRoot} from 'recoil';
/*import를 하지 않고 public폴더에 사진 넣어두고 꺼내 쓰는 방식 사용. */

export const MyContext = createContext();/** Context이용 위해서 선언 */
export const MyDataState = atom ({
  key: 'MyDataState',
  default: {
    name:'이성주',
    age:'23',
    part:'WEB"',
    imgURL:'https://pardprofile.s3.ap-northeast-2.amazonaws.com/KakaoTalk_Photo_2023-09-10-15-16-55.jpeg',
    introduce:'pay it forward',
  },
});

export const likeCountState = atom({
  key:'likeCountState',
  default: 77,
});

export const isLikedState = atom({
  key:'isLikedState',
  default: false,
});

export const CommentsState = atom({
  key: 'CommentsState',
  default: [],
});

function App() {

  const [MyData, setUser] = useRecoilState(MyDataState);
  /* 리코일로 MyData 와 setUser라는 걸 어디서든 쓰고 변경할 수 있게 함.
  이 안에는 MyDataState 내용이 MyData에 들어있음. 고치고 싶으면 setUser 쓰면 됌 */

  const [data, setData] = useState();
  useEffect(() => {
    axios
      .get("http://3.35.236.83/pard/search/이성주")
      .then((response) => {
        const receivedData = response.data.data;
        if (receivedData && receivedData.imgURL) {
          setUser(receivedData);
          setUser(prevMyData => ({
            ...prevMyData,
            introduce: 'pay it forward'
          }));
        } else {
          // Handle a case where imgURL or receivedData is undefined
          console.error('Received data or imgURL is undefined.');
        }
      })
      .catch((error) => console.error("Error: " + error));
  }, [setUser]);
  /* axios로 서버로부터 name, age, part, imgURL 값들을 받아와서 MyData값에다가 넣음. */

  const [likeCount, setLikeCount] = useRecoilState(likeCountState);
  const [isLiked, setIsLiked] = useRecoilState(isLikedState);
  const [comments, setComments] = useRecoilState(CommentsState); /**댓글 목록 상태 */
  /** 리코일로 likeCount, isLiked, comments도 다른 곳에서 쓰고 변경할 수 있게함. 
   * 마찬가지로 이 안에는 각각 likeCountState, isLikedState, CommentsState의 정보가 들어가있음.
   */
  console.log(MyData.name);
  //악시오스에서 데이터 잘 받아오는지 확인 차 점검.

  return (
   
    <RecoilRoot>
      <Router>
        <Routes>
          <Route path="/edit-profile" element={<EditProfile />} />
          <Route path="/" element={<MyPage />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </Router>
    </RecoilRoot>

  );
}

export default App;