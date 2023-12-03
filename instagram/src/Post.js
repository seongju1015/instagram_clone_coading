import React from 'react';
import './App.css';
import { Link } from 'react-router-dom';

function Post(){
    return(
        <div className='post'>
          <img src ="Toogle.png" alt="헤더메뉴" className='header_menu'/>
          <img src="HipCat.png" alt="파드사진1" className='peed1'/>
          <img src="234.png" alt="파드사진2" className='peed2'/>
          <img src="Original.png" alt="파드로고" className='pard_logo'/>
          <img src="HipCat2.png" alt="피드사진3" className='peed3'/>
          
        </div>
    )
}

export default Post