import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Input from '../../components/Component/Input/Input';
import './Login.scss';

const Login = () => {
  const [inputValues, setInputValues] = useState({
    account: '',
    email: '',
    password: '',
  });
  const [typeId, setTypeId] = useState(1);

  const navigate = useNavigate();

  const handleInputValue = e => {
    const { name, value } = e.target;
    setInputValues(prevValues => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleTypeSelection = e => {
    const { name } = e.target;
    setTypeId(name === 'check1' ? 1 : 2);

    checkedInput();
  };

  const checkedInput = () => {
    return typeId === 1
      ? INPUT_DATA_INDIVIDUAL_LOGIN
      : INPUT_DATA_BUSINESS_LOGIN;
  };

  const loginPost = () => {
    if (typeId === null) {
      alert('개인 또는 사업자를 선택해주세요.');
      return;
    }

    fetch('http://192.168.219.100:3000/users/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify({
        typeId: typeId,
        account: inputValues.account,
        email: inputValues.email,
        password: inputValues.password,
      }),
    })
      .then(response => {
        if (response.ok === true) {
          return response.json();
        }
        alert('입력한 정보를 다시 확인해 주세요.');
      })
      .then(data => {
        if (data && data.message === 'SIGNIN_SUCCESS') {
          localStorage.setItem('TOKEN', data.accessToken);
          alert('로그인이 완료되었습니다.');
          navigate('/');
        } else if (data && data.message === 'INVALID_USER_REQUEST') {
          alert('입력한 정보를 다시 확인해 주세요.');
        }
      });
  };

  return (
    <div className="login">
      <div className="container individual">
        <h1>로그인</h1>
        <div className="select">
          <div className="inputBox">
            <input
              type="checkbox"
              name="check1"
              onChange={handleTypeSelection}
              checked={typeId === 1}
            />
            <label htmlFor="check1">개인</label>
          </div>
          <div className="inputBox">
            <input
              type="checkbox"
              name="check2"
              onChange={handleTypeSelection}
              checked={typeId === 2}
            />
            <label htmlFor="check2">사업자</label>
          </div>
        </div>
        <div className="form">
          <div className="userInfo">
            {checkedInput().map(inputLogin => (
              <Input
                key={inputLogin.id}
                className={inputLogin.className}
                name={inputLogin.name}
                type={inputLogin.type}
                placeholder={inputLogin.placeholder}
                value={inputValues[inputLogin.name]}
                handleInputValue={handleInputValue}
              />
            ))}
          </div>
          <button onClick={loginPost}>로그인</button>
          <span>
            <Link to="/users/signup">
              회원이 아니신가요? 여기를 클릭하여 회원이 되어주세요.
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Login;

const INPUT_DATA_INDIVIDUAL_LOGIN = [
  {
    id: 1,
    name: 'email',
    className: 'inputValue',
    type: 'text',
    placeholder: '이메일 주소',
  },
  {
    id: 2,
    name: 'password',
    className: 'inputValue',
    type: 'password',
    placeholder: '비밀번호',
  },
];

const INPUT_DATA_BUSINESS_LOGIN = [
  {
    id: 1,
    name: 'account',
    className: 'inputValue',
    type: 'text',
    placeholder: '사업자번호(10자리)',
  },
  {
    id: 2,
    name: 'password',
    className: 'inputValue',
    type: 'password',
    placeholder: '비밀번호',
  },
];
