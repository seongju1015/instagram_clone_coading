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
  /*const [MyData, setUser] = useState({
    name:'',
    age:'',
    part:'',
    imgURL:'',
    introduce:'',
  });
  /** 저장할 기본적인 data값들. axios로 기본값 설정 후 Context를 이용해서 바꿔줌 값들임. */

  const [MyData, setUser] = useRecoilState(MyDataState);

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
  /** useState값을 Context사용해서 변경하기 위해서 App.js에 선언해놓음. */
  console.log(MyData.name);

  return (
    // <MyContext.Provider value={{MyData, setUser,
    // likeCount,setLikeCount,
    // isLiked, setIsLiked,
    // comments, setComments}}>
    //   {/** Context사용 위해서 Provider 사용 후 value값으로 변경 되어야하는 값들 넣어줌. */}
    //   <Router>
    //     <Routes>
    //       <Route path="/edit-profile" element={<EditProfile />} />
    //       <Route path="/" element={<MyPage />} />
    //       <Route path="/home" element={<Home />} />
    //     </Routes>
    //   </Router>
    // </MyContext.Provider>
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