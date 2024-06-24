
// // MotorSeq.jsx
// import React, { useState, useEffect, useContext } from 'react';
// import { useLocation } from 'react-router-dom';
// import ProfileContext from './profilecontext';
// import { db } from '../firebase';
// import { doc, setDoc, getDoc } from "firebase/firestore";

// function MotorSeq() {
//   const location = useLocation();
//   const { title } = location.state || { title: 'Default Title' };
//   const { selectedProfile } = useContext(ProfileContext);

//   const [numSequences, setNumSequences] = useState(0);
//   const [sequences, setSequences] = useState([]);

//   useEffect(() => {
//     const fetchSequenceData = async () => {
//       if (selectedProfile) {
//         const seqDoc = await getDoc(doc(db, "sequences", selectedProfile.id + '_' + title));
//         if (seqDoc.exists()) {
//           const data = seqDoc.data();
//           setNumSequences(data.numSequences);
//           setSequences(data.sequences);
//         }
//       }
//     };

//     fetchSequenceData();
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

//   const handleSave = async () => {
//     if (selectedProfile) {
//       const data = { numSequences, sequences };
//       await setDoc(doc(db, "sequences", selectedProfile.id + '_' + title), data);
//       const fileData = `${numSequences}\n` + sequences
//         .map(seq => `${seq.start}\n${seq.duration1}\n${seq.delay1}\n${seq.duration2}\n${seq.delay2}`)
//         .join('\n');
//       const blob = new Blob([fileData], { type: 'text/plain' });
//       const link = document.createElement('a');
//       link.href = URL.createObjectURL(blob);
//       link.download = 'sequences.txt';
//       link.click();
//       alert('Sequences saved and file downloaded successfully.');
//     } else {
//       alert('Please select a profile first.');
//     }
//   };

//   return (
//     <div>
//       <h1>{title}</h1>
//       <label>
//         Number of Sequences:
//         <input type="number" value={numSequences} onChange={handleInputChange} />
//       </label>
//       <button onClick={handleGenerateSequences}>Generate</button>
//       <ul>
//         {sequences.map((sequence, index) => (
//           <li key={index}>
//             <div>
//               <label>
//                 Start:
//                 <input
//                   type="number"
//                   value={sequence.start}
//                   onChange={(e) => handleSequenceChange(index, 'start', e.target.value)}
//                 />
//               </label>
//               <label>
//                 Duration 1:
//                 <input
//                   type="number"
//                   value={sequence.duration1}
//                   onChange={(e) => handleSequenceChange(index, 'duration1', e.target.value)}
//                 />
//               </label>
//               <label>
//                 Delay 1:
//                 <input
//                   type="number"
//                   value={sequence.delay1}
//                   onChange={(e) => handleSequenceChange(index, 'delay1', e.target.value)}
//                 />
//               </label>
//               <label>
//                 Duration 2:
//                 <input
//                   type="number"
//                   value={sequence.duration2}
//                   onChange={(e) => handleSequenceChange(index, 'duration2', e.target.value)}
//                 />
//               </label>
//               <label>
//                 Delay 2:
//                 <input
//                   type="number"
//                   value={sequence.delay2}
//                   onChange={(e) => handleSequenceChange(index, 'delay2', e.target.value)}
//                 />
//               </label>
//             </div>
//           </li>
//         ))}
//       </ul>
//       <button onClick={handleSave}>Save</button>
//     </div>
//   );
// }

// export default MotorSeq;


// MotorSeq.jsx
// MotorSeq.jsx
import React, { useState, useEffect, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import ProfileContext from './profilecontext';
import { db } from '../firebase';
import { doc, setDoc, getDoc } from "firebase/firestore";

function MotorSeq() {
  const location = useLocation();
  const { title } = location.state || { title: 'Default Title' };
  const { selectedProfile } = useContext(ProfileContext);

  const [numSequences, setNumSequences] = useState(0);
  const [sequences, setSequences] = useState([]);

  useEffect(() => {
    const fetchSequenceData = async () => {
      if (selectedProfile) {
        const seqDoc = await getDoc(doc(db, "sequences", `${selectedProfile.id}_${title}`));
        if (seqDoc.exists()) {
          const data = seqDoc.data();
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
      await setDoc(doc(db, "sequences", `${selectedProfile.id}_${title}`), data);

      // Construct file content
      const fileData = `${numSequences}\n` + sequences
        .map(seq => `${seq.start}\n${seq.duration1}\n${seq.delay1}\n${seq.duration2}\n${seq.delay2}`)
        .join('\n');
      
      console.log('File Data:', fileData); // Debugging line

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
