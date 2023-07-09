import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import './MyPage.scss';

const MyPage = () => {
  const [user, setUser] = useState({});

  useEffect(() => {
    fetch('./data/savedUser.json')
      .then(res => res.json())
      .then(data => setUser(data.user));
  }, []);

  return (
    <div className="myPage">
      <div className="welcomeBox">
        <h1> 환영합니다, {user.name} 님。</h1>
      </div>
      <div className="containerBox">
        <div className="sideBar">
          <ul className="myPageList">
            <li>
              <Link to="/myPage">계정 정보</Link>
            </li>
            <li>
              <Link to="/orderResult">주문 내역</Link>
            </li>
            <li>
              <Link to="/">회원 탈퇴</Link>
            </li>
          </ul>
        </div>
        <div className="userInfoBox">
          <div className="userInfo">
            <div className="infoTopBox">
              <div className="typeTitle">개인정보</div>
              <div className="savedUserInfo">
                {user.name} 님
                <br />
                {user.email}
              </div>
              <input className="patchInfo" />
            </div>
            <div className="infoTopBox">
              <div className="typeTitle">
                비밀번호
                <button className="deleteButton">변경하기</button>
              </div>
              <div className="savedUserInfo">{user.password}</div>
              <input className="patchInfo" />
            </div>
            <div className="infoTopBox">
              <div className="typeTitle">
                주소록
                <button className="deleteButton">수정하기</button>
              </div>
              <div className="savedUserInfo">{user.address}</div>
              <input className="patchInfo" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyPage;
