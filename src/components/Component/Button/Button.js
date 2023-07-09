import React from 'react';

const Input = props => {
  const { className, btnText, signUpPost } = props;
  return (
    <button className={className} onClick={signUpPost}>
      {btnText}
    </button>
  );
};

export default Input;
