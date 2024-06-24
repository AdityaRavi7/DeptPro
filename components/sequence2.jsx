import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

function Sequence2() {
  const location = useLocation();
  const { title } = location.state || { title: 'Sequence Page' };

  const [start, setStart] = useState(0);
  const [stop, setStop] = useState(0);

  const handleSave = () => {
    const data = `${start}\n${stop}`;
    const blob = new Blob([data], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${title.replace(/\s+/g, '_')}_parameters.txt`;
    link.click();
  };

  return (
    <div className="sequence2">
      <h1>{title}</h1>
      <div className="control">
        <label>Start</label>
        <input
          type="range"
          min="0"
          max="50"
          value={start}
          onChange={(e) => setStart(Number(e.target.value))}
        />
        <span>{start}</span>
      </div>
      <div className="control">
        <label>Stop</label>
        <input
          type="range"
          min="0"
          max="50"
          value={stop}
          onChange={(e) => setStop(Number(e.target.value))}
        />
        <span>{stop}</span>
      </div>
      <button onClick={handleSave}>Save</button>
    </div>
  );
}

export default Sequence2;
