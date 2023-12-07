import React, {useState,useContext} from "react";
import axios from 'axios';
import {MyContext, MyDataState} from './App';
import {Link} from 'react-router-dom';
import styled from "styled-components";
import {useRecoilState} from 'recoil';
import './App.css';

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
const RightHeaderIcon = styled.div`
    margin-right: 1%;
`
const RightHeaderIconDetail = styled.div`
    display: flex;
    justify-content: space-between;
    padding:1%;
    width:120%;
`
const Body = styled.div`
    width:80%;
    height: 680px;
    margin-top:10%;
    margin-bottom:10%;
    background-color: white;
    display:grid;
    grid-template-columns: 1fr 1fr 1fr;
`

const SideBar = styled.span`
    width: 70%;
    height: 680px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background-color: white;
`;
const SideMeta = styled.div`
    margin-top: 10%;
`
const Button = styled.button`
    width: 15vw;
    height: 8vh;
    margin-top: 3%;
    border:none;
    background-color: white;
    font-weight: 600;
`;
const SideEditProfile = styled.div`
  width: 20%;
  margin-top: 5%;
`;

const EditForm = styled.form`
    width:120%;
    display: flex;
    justify-content: center;
    text-align: right;
    background-color: white;
`;
const FormDetail = styled.div`
    display:flex;
    height: 100vh;
    flex-direction: column;
    justify-content: space-between;
`

function EditProfile(){

    const [MyData, setUser] = useRecoilState(MyDataState);/*useRecoilState로 App.js에 있던 MyData값 가져옴 */
    /*유즈 리코일 스테이트는 유즈스테이트처럼 값을 변경할 수 있지만, 전역적으로 값이 바뀜.*/

    const [userName, setUserName] = useState(MyData.name) /*props로 초기이름 설정 */
    const [userAge, setUserAge] = useState(MyData.age)
    const [userPart, setUserPart] = useState(MyData.part)
    const [userIntroduce, setUserIntroduce] = useState(MyData.introduce)/*props로 초기소개 설정 */
    const [userSite, setUserSite] = useState(MyData.site)/*props로 초기사이트 설정 */
    const [userEmail, setUserEmail] = useState(MyData.email)/*props로 초기이메일 설정 */
    const [userGender, setUserGender] = useState(MyData.gender)/*props로 초기성별 설정 */
    const [isFormDirty, setIsFormDirty] = useState(false);/*폼에 변경사항 있는지 확인 */
    const [isClicked, setIsClicked] = useState(false); /*사진바꾸기 */
    const [userImg, setUserImg] = useState(MyData.imgURL)

    /*function handleFileChange(event) {
        const selectedFile = event.target.files[0];
        if (selectedFile) {
          const imageURL = URL.createObjectURL(selectedFile);
          const imgElement = document.getElementById("profileImage");
          imgElement.src = imageURL;
          setUserImg(imageURL);
        }
    }*/
    
    const handleFileUpload = (event) => {
      const formData = new FormData();/* 대부분 폼에서 파일 업로드할 때 FormData 사용*/
      formData.append("image", event.target.files[0]);
      /*"image는 폼데이터 필드의 이름임. 이건 api주소 따라 달라짐." 
        따라서 여기서는 api주소가 image가 들어가있기 때문에 무조건 image라고 적어야함
        append는 객체에 key와 value값 추가하는 거임. 즉 여기서는 formData라는 객체 안에
        'image'라는 필드 이름을 추가하고 이 필드의 value값으로 우리가 선택한 파일(중 첫번째)을 받음*/
      
          axios
            .post("http://3.35.236.83/image", formData)
            .then((response) => {
              console.log("이미지가 성공적으로 업로드되었습니다:", response.data);
              setUserImg(response.data)
              // 서버에서의 응답을 처리합니다.
            })
            .catch((error) => {
              console.error("이미지 업로드 중 오류 발생:", error);
              // 오류를 처리합니다.
            });
        };
    /*사용자가 사진을 올리면, 올린 사진을 악시오스를 이용해서 서버에 이미지 보낸 후 
    서버에서 변환해준 string타입의 url를 userIMG라는 useState에 저장*/
    const handleClick = () => {
        
        setIsClicked(!isClicked);
    } /*클릭 되었는지 안되었는지 상태. 초기 상태를 클릭 안되었는지로 봄*/

    const handleFieldChange = () => {
        setIsFormDirty(true);
      }; /*폼 변경사항 있는지 확인. 변경사항 있으면 폼변경사항 useState를 true상태로 만듬 */

    const handleUserNameChange = (event) => {
        setUserName(event.target.value);
    } /*사용자가 입력한 이름 가져와서 useName변수에 저장 */
    /*const handleUserIntroduceChange = (event) => {
        setUserIntroduce(event.target.value);
    } /*사용자가 입력한 소개글 가져와서 useIntroduce 변수에 저장 */
    /*const handleUserSiteChange = (event) => {
        setUserSite(event.target.value);
    } /*사용자가 입력한 사이트 가져와서 useSite 변수에 저장 */
    /*const handleUserEmailChange = (event) => {
        setUserEmail(event.target.value);
    } /*사용자가 입력한 이메일 가져와서 useEmail 변수에 저장 */
    /*const handleUserGenderChange = (event) => {
        setUserGender(event.target.value);
    } /*사용자가 입력한 성별 가져와서 useGender 변수에 저장 */
    const handleUserAgeChange = (event) =>{
        setUserAge(event.target.value);
    }/*사용자가 입력한 성별 가져와서 useAge 변수에 저장 */
    const handleUserPartChange = (event) =>{
        setUserPart(event.target.value)
    }/*사용자가 입력한 성별 가져와서 usePart 변수에 저장 */
    const handlerSubmitChange = (event) => {
        event.preventDefault();/*제출할 때 새로고침 안되게 하는 역할 */
        setUser({
            name: userName,
            age: userAge,
            part: userPart,
            introduce: userIntroduce,
            imgURL: userImg,
        });
        const updatedData = {
            name: userName,
            age: userAge,
            part: userPart,
            introduce: userIntroduce,
            imgURL: userImg,
        };
        
        axios.patch('http://3.35.236.83/pard/update/이성주', updatedData)
        .then((response) => {
            console.log('업데이트 성공', response.data);
        })
        .catch((error) =>{
            console.error('업데이트 실패',error);
        });
        
    } /*submit버튼 누르면 context를 이용해서 현재 usestate에 있는 정보들 넘겨줌.
        axios를 이용해서 서버로 변경된 데이터를 넘겨줌.*/

    const isSubmitDisabled = !isFormDirty || (
        userName === MyData.name &&
        userAge === MyData.age&&
        userPart === MyData.Part&&
        userImg === MyData.imgURL
      ); /*폼 변경사항이 없거나(isFormDity가 부정인 상황)
      또는 userState정보들이 초기 context의 값과 똑같은 상황에서
      폼 버튼 비활성화 */
    
    return(
        <div className="container">
            <InstaLogo>
                <LeftHeaderIcon>
                    <Link to="/">
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

            <Body>
                <div className="sideBar">
                    <SideBar>
                        <SideEditProfile>
                            <Button>프로필 편집</Button>
                            <Button>비밀번호 변경</Button>
                        </SideEditProfile>
                
                        <SideMeta>
                            <img src="meta.png" alt="메타사진" className="meta"></img>
                        </SideMeta>
                    </SideBar>
                </div>

                <div>
                <EditForm>
                    <form>
                        <FormDetail>
                            <div>
                                <div className="currentProfile">
                                    <span className="from_label">
                                        <span>                                  
                                            <img
                                            src={userImg}
                                            alt="프로필 이미지"
                                            className="profile-image"
                                            id="profileImage"
                                            />
                                        </span>
                                        <div className="top_from">
                                            <p>{userName}</p>
                                            <input type="file" accept="image/*" id="fileInput" onChange={handleFileUpload} style={{ display: 'none' }} />
                                            <label htmlFor="fileInput" style={{ cursor:'pointer', color:'dodgerblue' }}>프로필 사진 바꾸기</label>
                                            {/*input의 file태그를 사용해서 사용자의 파일에서 사진을 선택 */}
                                        </div>
                                    </span>
                                </div><br></br>
                                <div className="userName">
                                    <span className="form_label">사용자 이름</span>
                                    <input type="text" value={userName} onChange={(e) => {setUserName(e.target.value);handleUserNameChange(e); handleFieldChange();}} className="form_size1"></input>
                                </div>

                                <div className="userSite">
                                    <span className="form_label">나이</span>
                                    <input type="text" value={userAge} onChange={(e) => {setUserAge(e.target.value);handleUserAgeChange(e); handleFieldChange();}} className="form_size1"></input>
                                </div>

                                <div className="userEmail">
                                    <span className="form_label">파트</span>
                                    <input type="text" value={userPart} onChange={(e) => {setUserPart(e.target.value);handleUserPartChange(e); handleFieldChange();}} className="form_size1"></input>
                                </div>
                            </div>

                            <div>
                                <div className="submitButton">
                                    <input type="submit" value="제출" onClick={handlerSubmitChange} className="submit_button" disabled={isSubmitDisabled}></input>
                                </div>
                            </div>
                        </FormDetail>
                    </form>

                </EditForm> 
                </div>
            

            </Body>
  
    </div>

    );
};

export default EditProfile;