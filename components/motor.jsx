import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ref, get, set } from 'firebase/database'; // Import Realtime Database functions
import Card from './cards';
import ProfileContext from './profilecontext';
import "./../src/App.css"
import database from '../src/firebase';

function Motor() {
  const navigate = useNavigate();
  const { selectedProfile } = useContext(ProfileContext);
  const [numMotors, setNumMotors] = useState(0);
  const [motorTitles, setMotorTitles] = useState([]);

  useEffect(() => {
    const fetchMotorData = async () => {
      if (selectedProfile) {
        const motorRef = ref(database, `motors/${selectedProfile.id}`);
        const motorSnap = await get(motorRef);
        if (motorSnap.exists()) {
          const data = motorSnap.val();
          setNumMotors(data.numMotors);
          setMotorTitles(data.motorTitles);
        }
      }
    };

    fetchMotorData();
  }, [selectedProfile]);

  const handleCardClick = (title) => {
    navigate('/MotorSeq', { state: { title } });
  };

  const handleInputChange = (e) => {
    const number = parseInt(e.target.value, 10);
    if (!isNaN(number)) {
      setNumMotors(number);
      const titles = Array.from({ length: number }, (_, index) => `Motor${index + 1}`);
      setMotorTitles(titles);
    } else {
      setNumMotors(0);
      setMotorTitles([]);
    }
  };

  const handleSave = async () => {
    if (selectedProfile) {
      const data = { numMotors, motorTitles };
      const motorRef = ref(database, `motors/${selectedProfile.id}`);
      await set(motorRef, data);
      alert('Motor data saved successfully.');
    } else {
      alert('Please select a profile first.');
    }
  };

  if (!selectedProfile) {
    return <div>Please select a profile first.</div>;
  }

  return (
    <div className='motor'>
      <h1>{selectedProfile.name}</h1>
      <label htmlFor="motorCount">Enter number of motors: </label>
      <input
        type="number"
        id="motorCount"
        value={numMotors}
        onChange={handleInputChange}
        min="0"
      />
      <button onClick={handleSave}>Save Motors</button>
      <div className="motor-cards">
        {motorTitles.map((title, index) => (
          <Card
            key={index}
            onClick={() => handleCardClick(title)}
            title={title}
          />
        ))}
      </div>
    </div>
  );
}

export default Motor;