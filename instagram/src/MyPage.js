import React from 'react';
import './App.css';
import Profile from './Profile.js';
import Post from './Post.js';
import { Link } from 'react-router-dom';
import EditProfile from './EditProfile';
import styled from "styled-components";

const InstaLogo = styled.div`
    display: flex;
    justify-content: left;
    width:935;
    height:53px;
    margin-top:2%;
`;

function MyPage(props){
    return(
        <div className = "container">
            <div className = "body">
                <InstaLogo>
                    <Link to="/home">
                        <button style={{backgroundColor:'white', border:'none',cursor:'pointer'}}><img src = "Logo.png" /></button>
                        <button className='home_button'><img src = "Menu-Button-Item.png" alt ="홈로고"/></button>
                    </Link>
                    <button className='header_heart'><img src='heart_icon.png' alt="헤더하트"></img></button>
                    <img src = "NewPosts.png" alt ="더하기로고" className="plus_logo"/>
                    <Link to="/edit-profile">
                        <img src = "miniProfile.png" alt ="작은프로필" className="mini_profile"/>
                    </Link>
                </InstaLogo>

            <div>
                <Profile user={props.user}/>
            </div>

            <div>
                <Post/>
            </div>
        </div>
    </div>
    )
}

export default MyPage