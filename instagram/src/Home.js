import React, {useState,useContext} from "react";
import {useMediaQuery} from 'react-responsive';
import MediaQuery from "react-responsive";
import { MyContext } from "./App";
import {Link} from 'react-router-dom';
import styled from "styled-components";
import { useRecoilState } from 'recoil';
import './App.css';
import { MyDataState, likeCountState, isLikedState, CommentsState } from './App';


const InstaLogo = styled.div`
    display:flex;
    align-items: center;
    justify-content: space-between;
    @media(min-width: 750px){
        width:75%;
    }
    @media(min-width: 450px)and(max-width: 750px){
        width:50%;
    }
    @media(max-width: 450px){
        width:50%;
    }
`; /*모바일, 테블릿, 피시 버전 따라서 헤더 크기 조정 */
const LeftHeaderIcon = styled.div`
    margin-top: 1%;
`
const LogoButton = styled.button`
    background-color: #fafafa;
    border:none;
    cursor:pointer;
`
const SearchInput = styled.input`
    background-color: #fafafa;
    border-color: lightgrey;
    border-style: solid;
    width:40%;
`
const RightHeaderIcon = styled.div`
    margin-right: 1%;
`
const RightHeaderIconDetail = styled.div`
    display: flex;
    justify-content: space-between;
    padding:1%;
    width:120%;
`
const RightPart = styled.div`
    width:75%;
    display: flex;
    justify-content: right;
    margin-top: 5%;
    margin-left: 5%;
`
const RightPartProfile = styled.img`
    width:56px;
    height:56px;
    border-radius:56px;
`
const RightPartId = styled.div`
    font-weight: bold;
    margin-left: 5%;
`
const BodyPost = styled.div`
    width: 50%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-top: 5%;
    padding-top: 3%;
    background-color: #FFFFFF;
`;
const ProfileAndId = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: 3%;
`;
const LeftComponent = styled.div`
    display: flex;
    flex-direction: row;
`;
const RightComponent = styled.div`
    margin-right: 1%;
`
const MiddleProfile = styled.img`
    margin-left: 2vw;
    margin-bottom: 2%;
    width:38px;
    height:38px;
    border-radius:22px;
`;
const PostUserId = styled.div`
    font-size: large;
    margin-left: 3vw;
    font-weight: 470;
    margin-top: 4%;
`;
const PostHeaderButton = styled.button`
    width: 40px;
    height: 40px;
    margin-right: 1vw;
    background-color: white;
    border:none;
    font-weight: bold;
    font-size:large;
    cursor:pointer;
`;
const PostPicture = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;
const Post_picture =styled.img`
    width:85%;
    height:40%;
`
const PostEmotion = styled.div`
    display: flex;
    flex-direction:row;
    justify-content: space-between;
    
    margin-left: 3%;
    margin-top: 3vh;
`;
const PostLeftEmotion = styled.div`
    margin-top: 1%;
`
const PostRightEmotion = styled.div`
    margin-top: 3%;
    margin-right: 2%;
`
const Comment = styled.div`

display: flex;
flex-direction: row;
justify-content: space-between;
align-items: center;
margin-top: 4%;
margin-left:3%;
margin-bottom: 4%;
padding-bottom:4%;

`;
const SmileImg = styled.img`
    height:20px;
    width:20px;
`;

const WriteBox = styled.input`
    margin-left: 3%;
    width:55%;
    height:30px;
    border:none;
`;
const SubmitButton = styled.button`
    background-color: white;
    color:dodgerblue;
    border:none;
    font-size: large;
    cursor:pointer;
    @media(min-width: 450px){
        width:30%;
        margin-right: 5%;
    }
    @media(max-width: 450px){
        width:30%;
        margin-right: -8vw;
    }
    text-align: right;
    padding:0;
`;/*제출버튼 크기값 모바일과 모바일 아닐 때 서로 다르게 조정 */
const MobileFooter = styled.div`
    display:flex;
    justify-content: center;
    width:50%;
`
const FooterDetail = styled.div`
    display: flex;
    width: 100%;
    justify-content: space-between;
`

function Home(){
    /*const {MyData, setUser,
        likeCount,setLikeCount,
        isLiked, setIsLiked,
        comments, setComments} = useRecoilState(MyContext);
        /* 밑에서 쓰이는 useState 변수들을 모두 context에 넣어서  useContext로 사용
        이렇게 하면 props없이 변경된 값이 다른 페이지에서도 바로 적용 가능함.*/

    const [MyData, setUser] = useRecoilState(MyDataState);
    const [likeCount, setLikeCount] = useRecoilState(likeCountState);
    const [isLiked, setIsLiked] = useRecoilState(isLikedState);
    const [comments, setComments] = useRecoilState(CommentsState);
    console.log(likeCount);
    console.log(MyData.name);

    const [commentLikeCount, setCommentLikeCount] = useState(0); /**댓글 좋아요 수 설정 */
    const [newCommentLikeCount, setNewCommentLikeCount] = useState(0); /**새로운 댓글 좋아요 수 설정  */
    const [isCommentLiked, setIsCommentLiked] = useState(false);/** 댓글 좋아요 눌러져있는지 확인. 초기값 false */
    const [isNewCommentLiked, setIsNewCommentLiked] = useState(false);/** 새로운 댓글 좋아요 눌러져있는지 확인. 초기값 false */
    const [newComment, setNewComment] = useState(""); /** 댓글 입력 상태 */

    const handleLikeClick = () => {
        if (!isLiked) {
            setLikeCount(likeCount + 1);
            setUser({
                name: MyData.name,
                introduce: MyData.introduce,
                site: MyData.site,
                email: MyData.email,
                gender: MyData.gender,
            });
        } else {
            setLikeCount(likeCount - 1);
            setUser({
                name: MyData.name,
                introduce: MyData.introduce,
                site: MyData.site,
                email: MyData.email,
                gender: MyData.gender,
            });
        }
        setIsLiked(!isLiked);
    }/*처음에는 좋아요 버튼이 눌러져있는 지 확인 후 
    안눌러져있다면 좋아요 숫자롤 하나 증가. 눌러져있으면 좋아요 숫자 감소 
    하트가 눌러져있으면 계속해서 if상태임. 다시누르면 else상태
    그래서 맨마지막에 다시 setIsLiked(!isLiked)*/

    const handleCommentLikeClick = () => {
        if (!isCommentLiked) {
            setCommentLikeCount(commentLikeCount + 1);
        } else {
            setCommentLikeCount(commentLikeCount - 1);
        }
        setIsCommentLiked(!isCommentLiked);
    }/*처음에는 댓글 좋아요 안달려있 지 확인. 안달려 있으면 추가
    달려있다면 감소  위 좋아요 수랑 똑같이 구성함*/

    const handleNewCommentLikeClick = () => {
        if (!isNewCommentLiked) {
            setNewCommentLikeCount(newCommentLikeCount + 1);
        } else {
            setNewCommentLikeCount(newCommentLikeCount - 1);
        }
        setIsNewCommentLiked(!isNewCommentLiked);
    }/* 댓글 좋아요에 새로운 댓글 추가 좋아요 버전 */

    const handleCommentSubmit = () => {
        if (newComment.trim() !== "") {
          setComments([...comments, newComment]);
          setNewComment("");
        }
      }; /*
      trim은 새로운 댓글이 공백이 아닌 문자열인지 확인. 
      trim은 양 끝 공백 제거 그리고 !==""로 결과가 비어있지 않는 문자열인지 확인
      setComments([...comments, newComment]) 이거는 현재 댓글 배열에 끝에 새로운 댓글을 추가함
      ...은 배열 연산자로서 comment배열 뒤에 newcomment를추가한다는 듯
      setNewComment("")이걸 해줘야 다음 댓글 쓸 때 비어있음. 아니면 이전 댓글내용이 나옴*/

    return(
        <div>
            <MediaQuery minWidth={450} maxWidth={750}>{/**React-responsive 안에 있는MediaQuery 태그 이용. 태블릿 버전 구현*/}
                <div className="container">
                    <InstaLogo>
                        <LeftHeaderIcon>
                            <Link to="/home">
                                <LogoButton><img src = "Logo.png" /></LogoButton>
                            </Link>
                        </LeftHeaderIcon>

                        <RightHeaderIcon>
                            <RightHeaderIconDetail>
                                <Link to="/home">
                                    <button className='home_home_button'><img src = "Menu-Button-Item.png" alt ="홈로고"/></button>
                                </Link>
                                <button className='home_header_heart'><img src='heart_icon.png' alt="헤더하트"></img></button>
                                <img src = "NewPosts.png" alt ="더하기로고" className="home_plus_logo"/>
                                <Link to="/">
                                    <img src = "miniProfile.png" alt ="작은프로필" className="home_mini_profile"/>
                                </Link>
                            </RightHeaderIconDetail>
                        </RightHeaderIcon>
                    </InstaLogo>

                    <BodyPost>
                            <ProfileAndId >
                                <LeftComponent>
                                    <MiddleProfile src = "miniProfile.png" alt ="중간프로필" />
                                    <PostUserId>katarinabluu</PostUserId>
                                </LeftComponent>

                                <RightComponent>
                                    <PostHeaderButton>' ' '</PostHeaderButton>
                                </RightComponent>     
                            </ProfileAndId>
                
                        <PostPicture>
                            <Post_picture src="army.png" alt="게시물 사진" className='post_picture' />
                        </PostPicture>

                        <div className="postFooter">
                            <PostEmotion>
                                <PostLeftEmotion>
                                    <span><button onClick={handleLikeClick} className="heart_button">
                                        {isLiked
                                            ? <img src="Vector.png" alt="" className="redheart_icon"/>
                                            : <img src="like.png" alt="" className="heart_icon" />
                                        } {/** 좋아요 눌렸느냐 안눌렸느냐에 따라서 ?(true값=눌렸을때)는 빨간색 하트 :(false)일 때는 일반하트 */}
                                    </button></span>
                                    <button style={{backgroundColor:"white", border:"none"}}><img src="CommentIcon.png"></img></button>
                                    <button style={{backgroundColor:"white", border:"none"}}><img src="SharePosts.png" id="sharePost"></img></button>
                                </PostLeftEmotion>

                                <PostRightEmotion>
                                    <button style={{backgroundColor:"white", border:"none"}} id="savePost"><img src="Save.png" ></img></button>
                                </PostRightEmotion>
                            </PostEmotion>

                            <div className="likeNum">
                                <p style={{marginLeft:'3%'}}>좋아요 {likeCount} 개</p>
                            </div>

                            <div className="postComment">                     
                                <div className="commentList">
                                    <span style={{marginLeft:'3%',fontWeight:'bold'}}>b2_ang</span>
                                    <span> 빵빵아! </span><br></br>
                                    <span style={{marginLeft:'3%', color: "grey" }}>좋아요 {commentLikeCount} 개</span>
                                    <span><button onClick={handleCommentLikeClick} className="comment_heart_button">
                                    {isCommentLiked
                                        ? <img src="redHeart.png" alt="" className="comment_redheart_icon"/>
                                        : <img src="heart_icon.png" alt="" className="comment_heart_icon" />
                                    }
                                </button></span>
                                </div>
                                
                                {comments.map((comment, index) => (
                                    <div className="commentList" key={index}>
                                    <span style={{ fontWeight: "bold" }}>sj_mon</span>
                                    <span> {comment} </span>
                                    <br></br>
                                    <span style={{ color: "grey" }}>좋아요 {newCommentLikeCount} 개</span>
                                    <span><button onClick={handleNewCommentLikeClick} className="comment_heart_button">
                                    {isNewCommentLiked
                                        ? <img src="redHeart.png" alt="" className="comment_redheart_icon"/>
                                        : <img src="heart_icon.png" alt="" className="comment_heart_icon" />
                                    }
                                </button></span>
                                    </div>
                                ))}
                                {/* map 부분은 comment배열을 돌아다니면서 key값으로 index를 받음
                                index는 자동으로 증가하면서 순회함. 새로운 댓글 추가하면 comments배열에 댓글생성
                                span comment로 되어있는 부분이 현재 적힌 댓글들 목록을 다 보여줌 */}

                                <Comment>
                                    <SmileImg src="Smile.png"></SmileImg>
                                    <WriteBox type="text" placeholder="댓글달기..." value={newComment} onChange={(e) => setNewComment(e.target.value)}></WriteBox>
                                    <SubmitButton onClick={handleCommentSubmit} >게시 </SubmitButton>
                                </Comment>
                            </div>
                        </div>
                    </BodyPost>
                </div>
            </MediaQuery>

            <MediaQuery minWidth={750}> {/**React-responsive 안에 있는 MediaQuery 태그 이용. PC 버전 구현*/}
            <div className="container">
                    <InstaLogo>
                        <LeftHeaderIcon>
                            <Link to="/home">
                                <button style={{backgroundColor:'white', border:'none',cursor:'pointer'}}><img src = "Logo.png" /></button>
                            </Link>
                        </LeftHeaderIcon>

                        <RightHeaderIcon>
                            <RightHeaderIconDetail>
                                <Link to="/home">
                                    <button className='home_home_button'><img src = "Menu-Button-Item.png" alt ="홈로고"/></button>
                                </Link>
                                <button className='home_header_heart'><img src='heart_icon.png' alt="헤더하트"></img></button>
                                <img src = "NewPosts.png" alt ="더하기로고" className="home_plus_logo"/>
                                <Link to="/">
                                    <img src = "miniProfile.png" alt ="작은프로필" className="home_mini_profile"/>
                                </Link>
                            </RightHeaderIconDetail>
                        </RightHeaderIcon>
                    </InstaLogo>

                    <RightPart>
                        <RightPartProfile src="miniProfile.png"></RightPartProfile>                
                        <RightPartId>sj_mon_</RightPartId>
                    </RightPart>

                    <BodyPost>
                            <ProfileAndId >
                                <LeftComponent>
                                    <MiddleProfile src = "miniProfile.png" alt ="중간프로필" />
                                    <PostUserId>katarinabluu</PostUserId>
                                </LeftComponent>

                                <RightComponent>
                                    <PostHeaderButton>' ' '</PostHeaderButton>
                                </RightComponent>     
                            </ProfileAndId>
                
                        <PostPicture>
                            <Post_picture src="army.png" alt="게시물 사진" className='post_picture' />
                        </PostPicture>

                        <div className="postFooter">
                            <PostEmotion>
                                <PostLeftEmotion>
                                    <span><button onClick={handleLikeClick} className="heart_button">
                                        {isLiked
                                            ? <img src="Vector.png" alt="" className="redheart_icon"/>
                                            : <img src="like.png" alt="" className="heart_icon" />
                                        }
                                    </button></span>
                                    <button style={{backgroundColor:"white", border:"none"}}><img src="CommentIcon.png"></img></button>
                                    <button style={{backgroundColor:"white", border:"none"}}><img src="SharePosts.png" id="sharePost"></img></button>
                                </PostLeftEmotion>

                                <PostRightEmotion>
                                    <button style={{backgroundColor:"white", border:"none"}} id="savePost"><img src="Save.png" ></img></button>
                                </PostRightEmotion>
                            </PostEmotion>

                            <div className="likeNum">
                                <p style={{marginLeft:'3%'}}>좋아요 {likeCount} 개</p>
                            </div>

                            <div className="postComment">                     
                                <div className="commentList">
                                    <span style={{marginLeft:'3%',fontWeight:'bold'}}>b2_ang</span>
                                    <span> 빵빵아! </span><br></br>
                                    <span style={{marginLeft:'3%', color: "grey" }}>좋아요 {commentLikeCount} 개</span>
                                    <span><button onClick={handleCommentLikeClick} className="comment_heart_button">
                                    {isCommentLiked
                                        ? <img src="redHeart.png" alt="" className="comment_redheart_icon"/>
                                        : <img src="heart_icon.png" alt="" className="comment_heart_icon" />
                                    }
                                </button></span>
                                </div>
                                
                                {comments.map((comment, index) => (
                                    <div className="commentList" key={index}>
                                    <span style={{ fontWeight: "bold" }}>sj_mon</span>
                                    <span> {comment} </span>
                                    <br></br>
                                    <span style={{ color: "grey" }}>좋아요 {newCommentLikeCount} 개</span>
                                    <span><button onClick={handleNewCommentLikeClick} className="comment_heart_button">
                                    {isNewCommentLiked
                                        ? <img src="redHeart.png" alt="" className="comment_redheart_icon"/>
                                        : <img src="heart_icon.png" alt="" className="comment_heart_icon" />
                                    }
                                </button></span>
                                    </div>
                                ))}

                                <Comment>
                                    <SmileImg src="Smile.png"></SmileImg>
                                    <WriteBox type="text" placeholder="댓글달기..." value={newComment} onChange={(e) => setNewComment(e.target.value)}></WriteBox>
                                    <SubmitButton onClick={handleCommentSubmit} >게시 </SubmitButton>
                                </Comment>
                            </div>

                        </div>
                    </BodyPost>
                </div>
            </MediaQuery>

            <MediaQuery maxWidth={450}> {/**React-responsive 안에 있는 MediaQuery 태그 이용. 모바일 버전 구현*/}
                <div className="container">
                    <InstaLogo>
                        <LogoButton><img src = "smal_insta.png" /></LogoButton>
                        <SearchInput type="text" placeholder="검색"></SearchInput>
                        <button className='home_header_heart'><img src='heart_icon.png' alt="헤더하트"></img></button>
                    </InstaLogo>

                    <BodyPost>
                            <ProfileAndId >
                                <LeftComponent>
                                    <MiddleProfile src = "miniProfile.png" alt ="중간프로필" />
                                    <PostUserId>katarinabluu</PostUserId>
                                </LeftComponent>

                                <RightComponent>
                                    <PostHeaderButton>' ' '</PostHeaderButton>
                                </RightComponent>     
                            </ProfileAndId>
                
                        <PostPicture>
                            <Post_picture src="army.png" alt="게시물 사진" className='post_picture' />
                        </PostPicture>

                        <div className="postFooter">
                            <PostEmotion>
                                <PostLeftEmotion>
                                    <span><button onClick={handleLikeClick} className="heart_button">
                                        {isLiked
                                            ? <img src="Vector.png" alt="" className="redheart_icon"/>
                                            : <img src="like.png" alt="" className="heart_icon" />
                                        }
                                    </button></span>
                                    <button style={{backgroundColor:"white", border:"none"}}><img src="CommentIcon.png"></img></button>
                                    <button style={{backgroundColor:"white", border:"none"}}><img src="SharePosts.png" id="sharePost"></img></button>
                                </PostLeftEmotion>

                                <PostRightEmotion>
                                    <button style={{backgroundColor:"white", border:"none"}} id="savePost"><img src="Save.png" ></img></button>
                                </PostRightEmotion>
                            </PostEmotion>

                            <div className="likeNum">
                                <p style={{marginLeft:'3%'}}>좋아요 {likeCount} 개</p>
                            </div>

                            <div className="postComment">                     
                                <div className="commentList">
                                    <span style={{marginLeft:'3%',fontWeight:'bold'}}>b2_ang</span>
                                    <span> 빵빵아! </span><br></br>
                                    <span style={{marginLeft:'3%', color: "grey" }}>좋아요 {commentLikeCount} 개</span>
                                    <span><button onClick={handleCommentLikeClick} className="comment_heart_button">
                                    {isCommentLiked
                                        ? <img src="redHeart.png" alt="" className="comment_redheart_icon"/>
                                        : <img src="heart_icon.png" alt="" className="comment_heart_icon" />
                                    }
                                </button></span>
                                </div>
                                
                                {comments.map((comment, index) => (
                                    <div className="commentList" key={index}>
                                    <span style={{ fontWeight: "bold" }}>sj_mon</span>
                                    <span> {comment} </span>
                                    <br></br>
                                    <span style={{ color: "grey" }}>좋아요 {newCommentLikeCount} 개</span>
                                    <span><button onClick={handleNewCommentLikeClick} className="comment_heart_button">
                                    {isNewCommentLiked
                                        ? <img src="redHeart.png" alt="" className="comment_redheart_icon"/>
                                        : <img src="heart_icon.png" alt="" className="comment_heart_icon" />
                                    }
                                </button></span>
                                    </div>
                                ))}

                                <Comment>
                                    <SmileImg src="Smile.png"></SmileImg>
                                    <WriteBox type="text" placeholder="댓글달기..." value={newComment} onChange={(e) => setNewComment(e.target.value)}></WriteBox>
                                    <SubmitButton onClick={handleCommentSubmit} >게시 </SubmitButton>
                                </Comment>
                            </div>
                        </div>
                    </BodyPost>

                    <MobileFooter>
                        <FooterDetail>
                            <Link to="/home">
                                <button className='home_home_button'><img src = "Menu-Button-Item.png" alt ="홈로고"/></button>
                            </Link>
                            <img src = "NewPosts.png" alt ="더하기로고" className="home_plus_logo"/>
                            <Link to="/">
                                <img src = "miniProfile.png" alt ="작은프로필" className="home_mini_profile"/>
                            </Link>
                        </FooterDetail>
                        
                    </MobileFooter>
                </div>
            </MediaQuery>
        </div>
    );
}

export default Home;