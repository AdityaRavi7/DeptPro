import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Card from './cards'; // Ensure the Card component is correctly imported

function MotorSeq() {
  const location = useLocation();
  const { title } = location.state || { title: 'Default Title' };

  const [numSequences, setNumSequences] = useState(0);
  const [sequences, setSequences] = useState([]);

  const handleInputChange = (event) => {
    setNumSequences(event.target.value);
  };

  const handleGenerateSequences = () => {
    const newSequences = [];
    for (let i = 1; i <= numSequences; i++) {
      newSequences.push(`${title} Sequence ${i}`);
    }
    setSequences(newSequences);
  };

  return (
    <div className='motorseq'>
      <h1>{title}</h1>
      <div>
        <label htmlFor="numSequences">Number of Sequences: </label>
        <input
          id="numSequences"
          type="number"
          value={numSequences}
          onChange={handleInputChange}
        />
        <button onClick={handleGenerateSequences}>Generate</button>
      </div>
      <div className="sequences">
        {sequences.map((sequenceTitle, index) => (
          <Card key={index} title={sequenceTitle} />
        ))}
      </div>
    </div>
  );
}

export default MotorSeq;
