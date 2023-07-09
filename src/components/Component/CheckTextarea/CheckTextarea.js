import React from 'react';

const Input = props => {
  const {
    inputBoxClassName,
    inputType,
    inputName,
    labelText,
    textareaClassName,
    textareaName,
    defaultValue,
  } = props;
  return (
    <div className={inputBoxClassName}>
      <input type={inputType} name={inputName} />
      <label htmlFor={inputName}>{labelText}</label>
      <textarea
        className={textareaClassName}
        name={textareaName}
        defaultValue={defaultValue}
      />
    </div>
  );
};

export default Input;
