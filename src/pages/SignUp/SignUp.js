import React, { useState } from 'react';
import { TERMS } from './termsData';
import SignUpContainer from './SignUpContainer/SignUpContainer';

import './SignUp.scss';

const INPUT_DATA_INDIVIDUAL = [
  {
    id: 1,
    name: 'name',
    className: 'inputValue',
    type: 'text',
    placeholder: '이름',
  },
  {
    id: 2,
    name: 'email',
    className: 'inputValue',
    type: 'text',
    placeholder: '이메일 주소',
  },
  {
    id: 3,
    name: 'password',
    className: 'inputValue',
    type: 'password',
    placeholder: '비밀번호',
  },
];

const INPUT_DATA_BUSINESS = [
  {
    id: 1,
    name: 'name',
    className: 'inputValue',
    type: 'text',
    placeholder: '사업자명',
  },
  {
    id: 2,
    name: 'account',
    className: 'inputValue',
    type: 'text',
    placeholder: '사업자번호',
  },
  {
    id: 3,
    name: 'email',
    className: 'inputValue',
    type: 'text',
    placeholder: '이메일 주소',
  },
  {
    id: 4,
    name: 'password',
    className: 'inputValue',
    type: 'password',
    placeholder: '비밀번호',
  },
];

const BLACK_BTN = {
  className: 'blackBtn',
  btnText: '회원가입',
};

const SignUp = () => {
  const [signUp, setSignUp] = useState(null);
  const [signUpBtn, setSignUpBtn] = useState(false);

  const handleButtonClick = buttonName => {
    setSignUp(buttonName);
    setSignUpBtn(true);
  };

  return (
    <div className="signUp">
      {!signUpBtn && (
        <div className="accountSelect">
          <div className="accountSelectContainer">
            <button
              className="blackBtn"
              onClick={() => handleButtonClick('개인 회원가입')}
            >
              개인 회원가입
            </button>
            <span>|</span>
            <button
              className="blackBtn"
              onClick={() => handleButtonClick('사업자 회원가입')}
            >
              사업자 회원가입
            </button>
          </div>
        </div>
      )}

      {signUpBtn && (
        <SignUpContainer
          signUp={signUp}
          inputDataIndividual={INPUT_DATA_INDIVIDUAL}
          inputDataBusiness={INPUT_DATA_BUSINESS}
          terms={TERMS}
          blackBtn={BLACK_BTN}
        />
      )}
    </div>
  );
};

export default SignUp;
