import React, { useState, useEffect } from 'react';
import './Count.scss';

const Count = ({ countNumber, setCount, isDisabled }) => {
  const [count, setInternalCount] = useState(Number(countNumber) || 1);

  useEffect(() => {
    setInternalCount(Number(countNumber) || 1);
  }, [countNumber]);

  const decrease = () => {
    if (count <= 1) {
      return;
    } else {
      const newCount = count - 1;
      setInternalCount(newCount);
      setCount(newCount);
    }
  };

  const increase = () => {
    const newCount = count + 1;
    setInternalCount(newCount);
    setCount(newCount);
  };

  return (
    <div className="count">
      <div className="countInput">
        <button onClick={decrease}>-</button>
        <div className="countInputText">{count}</div>
        <button onClick={increase} disabled={isDisabled}>
          +
        </button>
      </div>
    </div>
  );
};

export default Count;
