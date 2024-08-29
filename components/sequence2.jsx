import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { ref, set, get } from 'firebase/database';
import database from '../src/firebase';

function Sequence2() {
  const location = useLocation();
  const { title } = location.state || { title: 'Sequence Page' };

  const [start, setStart] = useState(0);
  const [stop, setStop] = useState(0);

  useEffect(() => {
    const fetchSequenceData = async () => {
      const sequenceRef = ref(database, `sequences/${title}`);
      const snapshot = await get(sequenceRef);
      if (snapshot.exists()) {
        const data = snapshot.val();
        setStart(data.start || 0);
        setStop(data.stop || 0);
      }
    };

    fetchSequenceData();
  }, [title]);

  const handleSave = async () => {
    const data = { start, stop };
    const sequenceRef = ref(database, `sequences/${title}`);
    try {
      await set(sequenceRef, data);

      // Construct file content
      const fileData = `${start}\n${stop}`;
      
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
