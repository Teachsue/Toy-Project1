import React from 'react';

const Input = props => {
  const { name, className, type, placeholder, value, handleInputValue } = props;

  const handleChange = e => {
    handleInputValue(e);
  };

  return (
    <input
      name={name}
      className={className}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={handleChange}
    />
  );
};

export default Input;
