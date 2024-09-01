import React, { useState, useEffect, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { ref, get, set } from 'firebase/database'; // Import Realtime Database functions
import ProfileContext from './profilecontext';
import database from '../src/firebase';

function MotorSeq() {
  const location = useLocation();
  const { title } = location.state || { title: 'Default Title' };
  const { selectedProfile } = useContext(ProfileContext);

  const [numSequences, setNumSequences] = useState(0);
  const [sequences, setSequences] = useState([]);

  useEffect(() => {
    const fetchSequenceData = async () => {
      if (selectedProfile) {
        const sequenceRef = ref(database, `sequences/${selectedProfile.id}_${title}`);
        const sequenceSnap = await get(sequenceRef);
        if (sequenceSnap.exists()) {
          const data = sequenceSnap.val();
          setNumSequences(data.numSequences || 0);
          setSequences(data.sequences || []);
        }
      }
    };

    fetchSequenceData();
  }, [selectedProfile, title]);

  const handleInputChange = (event) => {
    setNumSequences(Number(event.target.value));
  };

  const handleGenerateSequences = () => {
    const newSequences = Array.from({ length: numSequences }, () => ({
      delay: 0,
      occurrences: 1 // Initialize with 1 occurrence by default
    }));
    setSequences(newSequences);
  };

  const handleSequenceChange = (index, field, value) => {
    const newSequences = [...sequences];
    newSequences[index] = { ...newSequences[index], [field]: Number(value) };
    setSequences(newSequences);
  };

  const handleSave = async () => {
    if (selectedProfile) {
      const data = { numSequences, sequences };
      const sequenceRef = ref(database, `sequences/${selectedProfile.id}_${title}`);
      await set(sequenceRef, data);

      // Construct file content
      const fileData = `${numSequences}\n` + sequences
        .map(seq => `${seq.delay} ${seq.occurrences}`)
        .join('\n');

      // Create blob and trigger download
      const blob = new Blob([fileData], { type: 'text/plain' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = `${selectedProfile.id}_${title.replace(/\s+/g, '_')}_sequences.txt`;
      document.body.appendChild(link); // Append to body
      link.click();
      document.body.removeChild(link); // Remove from body

      alert('Sequences saved and file downloaded successfully.');
    } else {
      alert('Please select a profile first.');
    }
  };

  const handlePushToBoard = async () => {
    if (selectedProfile && title) {
      // Extract motor number from title (e.g., "Motor2" -> "2")
      const motorNumber = title.replace('Motor', '');
      const motorKey = `MOTOR${motorNumber}`;
      const currentRef = ref(database, `CURRENT/${motorKey}`);
      await set(currentRef, {
        numSequences: numSequences,
        sequences: sequences
      });

      alert(`Data pushed to Motor ${motorNumber} successfully and overwritten.`);
    } else {
      alert('Please select a profile first.');
    }
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
          min="0"
        />
        <button onClick={handleGenerateSequences}>Generate</button>
      </div>
      <div className="sequences">
        {sequences.map((sequence, index) => (
          <div key={index} className="sequence">
            <h2>Sequence {index + 1}</h2>
            <div className="control">
              <label htmlFor={`delay-${index}`}>Delay</label>
              <input
                type="range"
                id={`delay-${index}`}
                min="0"
                max="10000"
                value={sequence.delay}
                onChange={(e) => handleSequenceChange(index, 'delay', e.target.value)}
              />
              <input
                type="number"
                min="0"
                max="10000"
                value={sequence.delay}
                onChange={(e) => handleSequenceChange(index, 'delay', e.target.value)}
                style={{ marginLeft: '10px', width: '100px' }}
              />
              <span style={{ marginLeft: '10px' }}>{sequence.delay} ms</span>
            </div>
            <div className="control">
              <label htmlFor={`occurrences-${index}`}>Occurrences</label>
              <input
                type="number"
                id={`occurrences-${index}`}
                min="1"
                max="100"
                value={sequence.occurrences}
                onChange={(e) => handleSequenceChange(index, 'occurrences', e.target.value)}
                style={{ marginLeft: '10px', width: '100px' }}
              />
              <span style={{ marginLeft: '10px' }}>{sequence.occurrences} times</span>
            </div>
          </div>
        ))}
      </div>
      <button onClick={handleSave}>Save All Sequences</button>
      <button onClick={handlePushToBoard}>PUSH TO BOARD</button>
    </div>
  );
}

export default MotorSeq;
