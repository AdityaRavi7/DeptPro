// import React, { useState, useEffect, useContext } from 'react';
// import { useNavigate } from 'react-router-dom';
// import Card from './cards';
// import ProfileContext from './profilecontext';

// function Motor() {
//   const navigate = useNavigate();
//   const { selectedProfile } = useContext(ProfileContext);
//   const [numMotors, setNumMotors] = useState(0);
//   const [motorTitles, setMotorTitles] = useState([]);

//   useEffect(() => {
//     if (selectedProfile) {
//       const storedData = JSON.parse(localStorage.getItem(`${selectedProfile.id}_motors`)) || { numMotors: 0, motorTitles: [] };
//       setNumMotors(storedData.numMotors);
//       setMotorTitles(storedData.motorTitles);
//     }
//   }, [selectedProfile]);

//   const handleCardClick = (title) => {
//     navigate('/MotorSeq', { state: { title } });
//   };

//   const handleInputChange = (e) => {
//     const number = parseInt(e.target.value, 10);
//     if (!isNaN(number)) {
//       setNumMotors(number);
//       const titles = Array.from({ length: number }, (_, index) => `Motor${index + 1}`);
//       setMotorTitles(titles);
//     } else {
//       setNumMotors(0);
//       setMotorTitles([]);
//     }
//   };

//   const handleSave = () => {
//     if (selectedProfile) {
//       const data = { numMotors, motorTitles };
//       localStorage.setItem(`${selectedProfile.id}_motors`, JSON.stringify(data));
//       alert('Motor data saved successfully.');
//     } else {
//       alert('Please select a profile first.');
//     }
//   };

//   if (!selectedProfile) {
//     return <div>Please select a profile first.</div>;
//   }

//   return (
//     <div className='motor'>
//       <h1>{selectedProfile.name}</h1>
//       <label htmlFor="motorCount">Enter number of motors: </label>
//       <input
//         type="number"
//         id="motorCount"
//         value={numMotors}
//         onChange={handleInputChange}
//         min="0"
//       />
//       <button onClick={handleSave}>Save Motors</button>
//       <div className="motor-cards">
//         {motorTitles.map((title, index) => (
//           <Card
//             key={index}
//             onClick={() => handleCardClick(title)}
//             title={title}
//           />
//         ))}
//       </div>
//     </div>
//   );
// }

// export default Motor;


import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import Card from './cards';
import ProfileContext from './profilecontext';
import db from '../src/firebase';

function Motor() {
  const navigate = useNavigate();
  const { selectedProfile } = useContext(ProfileContext);
  const [numMotors, setNumMotors] = useState(0);
  const [motorTitles, setMotorTitles] = useState([]);

  useEffect(() => {
    const fetchMotorData = async () => {
      if (selectedProfile) {
        const motorDoc = await getDoc(doc(db, 'motors', selectedProfile.id));
        if (motorDoc.exists()) {
          const data = motorDoc.data();
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
      await setDoc(doc(db, 'motors', selectedProfile.id), data);
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
