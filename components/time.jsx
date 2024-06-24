import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function Time() {
    const navigate = useNavigate();
  const location = useLocation();
  const { title } = location.state || { title: 'Time' };

  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);

  const handleSave = () => {
    const data = `${hours}\n${minutes}`;
    const blob = new Blob([data], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${title.replace(/\s+/g, '_')}_timestamp.txt`;
    link.click();
  };

  return (
    <div className="sequence1">
      <h1>{title}</h1>
      <div className="control">
        <label>Hours</label>
        <input
          type="number"
          min="0"
          max="23"
          value={hours}
          onChange={(e) => setHours(Number(e.target.value))}
        />
      </div>
      <div className="control">
        <label>Minutes</label>
        <input
          type="number"
          min="0"
          max="59"
          value={minutes}
          onChange={(e) => setMinutes(Number(e.target.value))}
        />
      </div>
      <button onClick={handleSave}>Save Timestamp</button>
    </div>
  );
}

export default Time;
