import React,{useContext} from 'react';
import {MyContext} from './App';
import './App.css';
import { Link } from 'react-router-dom';
import styled from "styled-components";
import {useRecoilState, useRecoilValue} from 'recoil';
import {MyDataState} from './App';


const ProfileIntroduce = styled.div`
  width:613px;
  height:150px;
  position:absolute;
  margin-left: 350px;
  margin-top: 120px;
`;

function Profile(){
const [MyData, setUser] = useRecoilState(MyDataState);
/* useRecoilState 이용해서 정보 가져옴. */
const updateMyData = () =>{
  setUser({
      name:MyData.name,
      age:MyData.age,
      part:MyData.part,
      imgURL:MyData.imgURL,
      introduce:MyData.introduce,
  });
};
if (!MyData || !MyData.name) {
  return <div>Loading...</div>; // 데이터가 로드 중이라면 로딩 중이라는 문구를 표시하거나 다른 처리를 할 수 있습니다.
}
console.log(MyData.name);

    return(
        <div className = "profile">
          <img src = {MyData.imgURL} alt="메인프로필" className="main_profile"/>
          <ProfileIntroduce>
            <div className='proflieName'>
              <span className='userProfileName'>{MyData.name}</span>
              <Link to="/edit-profile">
                <span>
                  <button className='profileEditButton' style={{cursor:"pointer", border:"1px solid darkgrey", marginLeft:"3%"}}>프로필 편집</button>
                </span>
                <img src="icon.png" alt="톱니바퀴아이콘" className='profileEditIcon'></img><br></br>
              </Link>
              <span className='post_mini'>게시물</span>
              <span className='post_num'>3</span>
              <span className='follower'>팔로워</span>
              <span className='follower_num'>777</span>
              <span className='follow'>팔로우</span>
              <span className='follow_num'>1</span>
              <p className='introduceMessage'>{MyData.introduce}</p>
            </div>

          </ProfileIntroduce>
        </div>
    )
}
export default Profile;