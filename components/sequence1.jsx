import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import '../src/App.css'; // Assuming you have a CSS file for styling

function Sequence1() {
  const location = useLocation();
  const { title } = location.state || { title: 'Default Title' };

  const [start, setStart] = useState(0);
  const [duration1, setDuration1] = useState(0);
  const [delay1, setDelay1] = useState(0);
  const [duration2, setDuration2] = useState(0);
  const [delay2, setDelay2] = useState(0);

  const handleSave = () => {
    const data = { start, duration1, delay1, duration2, delay2 };
    console.log('Data saved:', data);
    // Add logic to save the data
  };

  return (
    <div className="sequence1">
      <h1>{title}</h1>
      <div className="control">
        <label>Start</label>
        <input
          type="range"
          min="0"
          max="100"
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
          max="100"
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
          max="100"
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
          max="100"
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
          max="100"
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
