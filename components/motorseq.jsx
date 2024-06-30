// import React, { useState, useEffect, useContext } from 'react';
// import { useLocation } from 'react-router-dom';
// import ProfileContext from './profilecontext';

// function MotorSeq() {
//   const location = useLocation();
//   const { title } = location.state || { title: 'Default Title' };
//   const { selectedProfile } = useContext(ProfileContext);

//   const [numSequences, setNumSequences] = useState(0);
//   const [sequences, setSequences] = useState([]);

//   useEffect(() => {
//     if (selectedProfile) {
//       const storedData = JSON.parse(localStorage.getItem(`${selectedProfile}_${title}_sequences`)) || { numSequences: 0, sequences: [] };
//       setNumSequences(storedData.numSequences);
//       setSequences(storedData.sequences);
//     }
//   }, [selectedProfile, title]);

//   const handleInputChange = (event) => {
//     setNumSequences(Number(event.target.value));
//   };

//   const handleGenerateSequences = () => {
//     const newSequences = Array.from({ length: numSequences }, () => ({
//       start: 0,
//       duration1: 0,
//       delay1: 0,
//       duration2: 0,
//       delay2: 0,
//     }));
//     setSequences(newSequences);
//   };

//   const handleSequenceChange = (index, field, value) => {
//     const newSequences = [...sequences];
//     newSequences[index] = { ...newSequences[index], [field]: Number(value) };
//     setSequences(newSequences);
//   };

//   const handleSave = () => {
//     if (selectedProfile) {
//       const data = { numSequences, sequences };
//       localStorage.setItem(`${selectedProfile}_${title}_sequences`, JSON.stringify(data));

//       // Construct file content
//       const fileData = `${numSequences}\n` + sequences
//         .map(seq => `${seq.start}\n${seq.duration1}\n${seq.delay1}\n${seq.duration2}\n${seq.delay2}`)
//         .join('\n');

//       // Create blob and trigger download
//       const blob = new Blob([fileData], { type: 'text/plain' });
//       const link = document.createElement('a');
//       link.href = URL.createObjectURL(blob);
//       link.download = `${selectedProfile}_${title.replace(/\s+/g, '_')}_sequences.txt`;
//       document.body.appendChild(link); // Append to body
//       link.click();
//       document.body.removeChild(link); // Remove from body

//       alert('Sequences saved and file downloaded successfully.');
//     } else {
//       alert('Please select a profile first.');
//     }
//   };

//   return (
//     <div className='motorseq'>
//       <h1>{title}</h1>
//       <div>
//         <label htmlFor="numSequences">Number of Sequences: </label>
//         <input
//           id="numSequences"
//           type="number"
//           value={numSequences}
//           onChange={handleInputChange}
//         />
//         <button onClick={handleGenerateSequences}>Generate</button>
//       </div>
//       <div className="sequences">
//         {sequences.map((sequence, index) => (
//           <div key={index} className="sequence">
//             <h2>Sequence {index + 1}</h2>
//             {['start', 'duration1', 'delay1', 'duration2', 'delay2'].map(field => (
//               <div key={field} className="control">
//                 <label>{field}</label>
//                 <input
//                   type="range"
//                   min="0"
//                   max="50"
//                   value={sequence[field]}
//                   onChange={(e) => handleSequenceChange(index, field, e.target.value)}
//                 />
//                 <span>{sequence[field]}</span>
//               </div>
//             ))}
//           </div>
//         ))}
//       </div>
//       <button onClick={handleSave}>Save All Sequences</button>
//     </div>
//   );
// }

// export default MotorSeq;


import React, { useState, useEffect, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import ProfileContext from './profilecontext';
import db from '../src/firebase';

function MotorSeq() {
  const location = useLocation();
  const { title } = location.state || { title: 'Default Title' };
  const { selectedProfile } = useContext(ProfileContext);

  const [numSequences, setNumSequences] = useState(0);
  const [sequences, setSequences] = useState([]);

  useEffect(() => {
    const fetchSequenceData = async () => {
      if (selectedProfile) {
        const sequenceDoc = await getDoc(doc(db, 'sequences', `${selectedProfile.id}_${title}`));
        if (sequenceDoc.exists()) {
          const data = sequenceDoc.data();
          setNumSequences(data.numSequences);
          setSequences(data.sequences);
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
      start: 0,
      duration1: 0,
      delay1: 0,
      duration2: 0,
      delay2: 0,
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
      await setDoc(doc(db, 'sequences', `${selectedProfile.id}_${title}`), data);

      // Construct file content
      const fileData = `${numSequences}\n` + sequences
        .map(seq => `${seq.start}\n${seq.duration1}\n${seq.delay1}\n${seq.duration2}\n${seq.delay2}`)
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
        />
        <button onClick={handleGenerateSequences}>Generate</button>
      </div>
      <div className="sequences">
        {sequences.map((sequence, index) => (
          <div key={index} className="sequence">
            <h2>Sequence {index + 1}</h2>
            {['start', 'duration1', 'delay1', 'duration2', 'delay2'].map(field => (
              <div key={field} className="control">
                <label>{field}</label>
                <input
                  type="range"
                  min="0"
                  max="50"
                  value={sequence[field]}
                  onChange={(e) => handleSequenceChange(index, field, e.target.value)}
                />
                <span>{sequence[field]}</span>
              </div>
            ))}
          </div>
        ))}
      </div>
      <button onClick={handleSave}>Save All Sequences</button>
    </div>
  );
}

export default MotorSeq;
