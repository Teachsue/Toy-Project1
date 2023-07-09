import React from 'react';
import './NotFound.scss';

const NotFound = () => {
  return (
    <div className="notFound">
      <div className="showBox">
        <img src="/images/mainLogo.png" alt="404notFound" className="logo" />
        <div className="alertTextBox">
          <h1> 404 Not Found</h1>
          <p>
            요청하신 페이지를 찾을수 없습니다. <br />
            메인으로 돌아가시겠습니까?
          </p>
          <div className="buttonBox">
            <button className="gotoMain">
              <a href="/" style={{ textDecoration: 'none' }}>
                메인페이지로 돌아가기
              </a>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default NotFound;
