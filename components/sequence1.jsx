import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { ref, set, get } from 'firebase/database';
import database from '../src/firebase';

function Sequence1() {
  const location = useLocation();
  const { title } = location.state || { title: 'Sequence Page' };

  const [start, setStart] = useState(0);
  const [duration1, setDuration1] = useState(0);
  const [delay1, setDelay1] = useState(0);
  const [duration2, setDuration2] = useState(0);
  const [delay2, setDelay2] = useState(0);

  useEffect(() => {
    const fetchSequenceData = async () => {
      const sequenceRef = ref(database, `sequences/${title}`);
      const snapshot = await get(sequenceRef);
      if (snapshot.exists()) {
        const data = snapshot.val();
        setStart(data.start || 0);
        setDuration1(data.duration1 || 0);
        setDelay1(data.delay1 || 0);
        setDuration2(data.duration2 || 0);
        setDelay2(data.delay2 || 0);
      }
    };

    fetchSequenceData();
  }, [title]);

  const handleSave = async () => {
    const data = { start, duration1, delay1, duration2, delay2 };
    const sequenceRef = ref(database, `sequences/${title}`);
    try {
      await set(sequenceRef, data);

      // Construct file content
      const fileData = `${start}\n${duration1}\n${delay1}\n${duration2}\n${delay2}`;
      
      // Create blob and trigger download
      const blob = new Blob([fileData], { type: 'text/plain' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = `${title.replace(/\s+/g, '_')}_parameters.txt`;
      link.click();

      alert('Data saved successfully.');
    } catch (e) {
      console.error("Error saving data: ", e);
    }
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
