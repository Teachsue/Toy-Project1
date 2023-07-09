import React, { useState, useEffect } from 'react';

const ConstructionCase = () => {
  const [porcelainCase, setPorcelainCase] = useState([]);

  useEffect(() => {
    fetch('/data/constructionCaseData.json')
      .then(res => res.json())
      .then(data => {
        setPorcelainCase(data);
      });
  }, []);
  return (
    <section className="constructionCase">
      <ul className="constructionCaseBox">
        {porcelainCase.map(info => (
          <li key={info.id}>
            <img src={info.img} alt={info.name} />
            <p>{info.name}</p>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default ConstructionCase;
