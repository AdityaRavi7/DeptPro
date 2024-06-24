import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

function Sequence1() {
  const location = useLocation();
  const { title } = location.state || { title: 'Sequence Page' };

  const [start, setStart] = useState(0);
  const [duration1, setDuration1] = useState(0);
  const [delay1, setDelay1] = useState(0);
  const [duration2, setDuration2] = useState(0);
  const [delay2, setDelay2] = useState(0);

  const handleSave = () => {
    const data = `${start}\n${duration1}\n${delay1}\n${duration2}\n${delay2}`;
    const blob = new Blob([data], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${title.replace(/\s+/g, '_')}_parameters.txt`;
    link.click();
  };

  return (
    <div className="sequence1">
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
        <label>Duration 1</label>
        <input
          type="range"
          min="0"
          max="50"
          value={duration1}
          onChange={(e) => setDuration1(Number(e.target.value))}
        />
        <span>{duration1}</span>
      </div>
      <div className="control">
        <label>Delay 1</label>
        <input
          type="range"
          min="0"
          max="50"
          value={delay1}
          onChange={(e) => setDelay1(Number(e.target.value))}
        />
        <span>{delay1}</span>
      </div>
      <div className="control">
        <label>Duration 2</label>
        <input
          type="range"
          min="0"
          max="50"
          value={duration2}
          onChange={(e) => setDuration2(Number(e.target.value))}
        />
        <span>{duration2}</span>
      </div>
      <div className="control">
        <label>Delay 2</label>
        <input
          type="range"
          min="0"
          max="50"
          value={delay2}
          onChange={(e) => setDelay2(Number(e.target.value))}
        />
        <span>{delay2}</span>
      </div>
      <button onClick={handleSave}>Save</button>
    </div>
  );
}

export default Sequence1;
