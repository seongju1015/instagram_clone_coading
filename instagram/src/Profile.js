import React,{useContext} from 'react';
import {MyContext} from './App';
import './App.css';
import { Link } from 'react-router-dom';
import styled from "styled-components";


const ProfileIntroduce = styled.div`
  width:613px;
  height:150px;
  position:absolute;
  margin-left: 350px;
  margin-top: 120px;
`;

function Profile(){
const {MyData,setUser} = useContext(MyContext);

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