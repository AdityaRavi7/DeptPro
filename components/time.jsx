import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import ProfileContext from './profilecontext';
import db from '../src/firebase';

function Time() {
  const { selectedProfile } = useContext(ProfileContext);
  const [sequenceCount, setSequenceCount] = useState(0);
  const [timeSequences, setTimeSequences] = useState([]);
  const [isSequenceInputVisible, setSequenceInputVisible] = useState(false);

  useEffect(() => {
    const fetchTimeData = async () => {
      if (selectedProfile) {
        const timeDoc = await getDoc(doc(db, 'timeSequences', selectedProfile.id));
        if (timeDoc.exists()) {
          const data = timeDoc.data();
          setSequenceCount(data.sequenceCount);
          setTimeSequences(data.timeSequences);
          setSequenceInputVisible(true);
        }
      }
    };

    fetchTimeData();
  }, [selectedProfile]);

  const handleSequenceCountChange = (event) => {
    const count = parseInt(event.target.value, 10) || 0;
    setSequenceCount(count);
    setSequenceInputVisible(false);
    setTimeSequences(new Array(count).fill({ hours: '', minutes: '' }));
  };

  const handleTimeChange = (index, field, value) => {
    const updatedSequences = timeSequences.map((sequence, seqIndex) => {
      if (seqIndex === index) {
        return { ...sequence, [field]: value };
      }
      return sequence;
    });
    setTimeSequences(updatedSequences);
  };

  const handleSave = async () => {
    if (selectedProfile) {
      const data = { sequenceCount, timeSequences };
      await setDoc(doc(db, 'timeSequences', selectedProfile.id), data);

      let fileData = `${sequenceCount}\n`;
      fileData += timeSequences
        .map(sequence => `${sequence.hours}\n${sequence.minutes}`)
        .join('\n');

      const blob = new Blob([fileData], { type: 'text/plain;charset=utf-8' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = `${selectedProfile.id}}_sequences.txt`;
      document.body.appendChild(link); // Append to body
      link.click();
      document.body.removeChild(link); // Remove from body      
      alert('Time sequences saved and file downloaded successfully.');
    } else {
      alert('Please select a profile first.');
    }
  };

  const handleNext = () => {
    setSequenceInputVisible(true);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Time Input Sequences App</h1>
        <div className="input-container">
          <label>
            Number of Sequences:
            <input
              type="number"
              value={sequenceCount}
              onChange={handleSequenceCountChange}
              min="0"
              placeholder="Enter number of sequences"
            />
          </label>
          <button onClick={handleNext} disabled={sequenceCount <= 0}>
            Next
          </button>
          {isSequenceInputVisible && (
            <div>
              {timeSequences.map((sequence, index) => (
                <div key={index}>
                  <h3>Time {index + 1}</h3>
                  <label>
                    Hours:
                    <input
                      type="number"
                      value={sequence.hours}
                      onChange={(e) => handleTimeChange(index, 'hours', e.target.value)}
                      min="0"
                      max="23"
                      placeholder="Enter hours"
                    />
                  </label>
                  <label>
                    Minutes:
                    <input
                      type="number"
                      value={sequence.minutes}
                      onChange={(e) => handleTimeChange(index, 'minutes', e.target.value)}
                      min="0"
                      max="59"
                      placeholder="Enter minutes"
                    />
                  </label>
                </div>
              ))}
              <button onClick={handleSave}>Save</button>
            </div>
          )}
        </div>
      </header>
    </div>
  );
}

export default Time;
