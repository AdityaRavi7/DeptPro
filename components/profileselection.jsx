// // // ProfileSelection.jsx
// // import React, { useState, useEffect, useContext } from 'react';
// // import { useNavigate } from 'react-router-dom';
// // import ProfileContext from './profilecontext';

// // function ProfileSelection() {
// //   const [profiles, setProfiles] = useState([]);
// //   const [newProfileName, setNewProfileName] = useState('');
// //   const { setSelectedProfile } = useContext(ProfileContext);
// //   const navigate = useNavigate();

// //   useEffect(() => {
// //     const storedProfiles = JSON.parse(localStorage.getItem('profiles')) || [];
// //     setProfiles(storedProfiles);
// //   }, []);

// //   const handleCreateProfile = () => {
// //     if (newProfileName) {
// //       const updatedProfiles = [...profiles, newProfileName];
// //       setProfiles(updatedProfiles);
// //       localStorage.setItem('profiles', JSON.stringify(updatedProfiles));
// //       setNewProfileName('');
// //     }
// //   };

// //   const handleSelectProfile = (profile) => {
// //     setSelectedProfile(profile);
// //     navigate('/');
// //   };

// //   const handleDeleteProfile = (profile) => {
// //     const updatedProfiles = profiles.filter(p => p !== profile);
// //     setProfiles(updatedProfiles);
// //     localStorage.setItem('profiles', JSON.stringify(updatedProfiles));
// //     localStorage.removeItem(profile);
// //   };

// //   return (
// //     <div className="profile-selection">
// //       <h1>Select or Create a Profile</h1>
// //       <input
// //         type="text"
// //         value={newProfileName}
// //         onChange={(e) => setNewProfileName(e.target.value)}
// //         placeholder="Enter profile name"
// //       />
// //       <button onClick={handleCreateProfile}>Create Profile</button>
// //       <ul>
// //         {profiles.map(profile => (
// //           <li key={profile}>
// //             {profile}
// //             <button onClick={() => handleSelectProfile(profile)}>Select</button>
// //             <button onClick={() => handleDeleteProfile(profile)}>Delete</button>
// //           </li>
// //         ))}
// //       </ul>
// //     </div>
// //   );
// // }

// // export default ProfileSelection;


// // // profileselection.jsx
// // import React, { useState, useContext } from 'react';
// // import { useNavigate } from 'react-router-dom';
// // import ProfileContext from './profilecontext';

// // function ProfileSelection() {
// //   const [newProfileName, setNewProfileName] = useState('');
// //   const { profiles, setSelectedProfile, addProfile, removeProfile } = useContext(ProfileContext);
// //   const navigate = useNavigate();

// //   const handleCreateProfile = () => {
// //     if (newProfileName) {
// //       addProfile(newProfileName);
// //       setNewProfileName('');
// //     }
// //   };

// //   const handleSelectProfile = (profile) => {
// //     setSelectedProfile(profile);
// //     navigate('/');
// //   };

// //   const handleDeleteProfile = (profileId) => {
// //     removeProfile(profileId);
// //   };

// //   return (
// //     <div className="profile-selection">
// //       <h1>Select or Create a Profile</h1>
// //       <input
// //         type="text"
// //         value={newProfileName}
// //         onChange={(e) => setNewProfileName(e.target.value)}
// //         placeholder="Enter profile name"
// //       />
// //       <button onClick={handleCreateProfile}>Create Profile</button>
// //       <ul>
// //         {profiles.map(profile => (
// //           <li key={profile.id}>
// //             {profile.name}
// //             <button onClick={() => handleSelectProfile(profile)}>Select</button>
// //             <button onClick={() => handleDeleteProfile(profile.id)}>Delete</button>
// //           </li>
// //         ))}
// //       </ul>
// //     </div>
// //   );
// // }

// // export default ProfileSelection;

// import React, { useState, useContext, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import ProfileContext from './profilecontext';

// function ProfileSelection() {
//   const [newProfileName, setNewProfileName] = useState('');
//   const { profiles, setSelectedProfile, addProfile, removeProfile } = useContext(ProfileContext);
//   const navigate = useNavigate();

//   useEffect(() => {
//     console.log("Profiles in context:", profiles);
//   }, [profiles]);

//   const handleCreateProfile = () => {
//     if (newProfileName) {
//       console.log("Creating profile with name:", newProfileName);
//       addProfile(newProfileName);
//       setNewProfileName('');
//     }
//   };

//   const handleSelectProfile = (profile) => {
//     console.log("Selecting profile:", profile);
//     setSelectedProfile(profile);
//     navigate('/');
//   };

//   const handleDeleteProfile = (profileId) => {
//     console.log("Deleting profile with ID:", profileId);
//     removeProfile(profileId);
//   };

//   return (
//     <div className="profile-selection">
//       <h1>Select or Create a Profile</h1>
//       <input
//         type="text"
//         value={newProfileName}
//         onChange={(e) => setNewProfileName(e.target.value)}
//         placeholder="Enter profile name"
//       />
//       <button onClick={handleCreateProfile}>Create Profile</button>
//       <ul>
//         {profiles.map(profile => (
//           <li key={profile.id}>
//             {profile.name}
//             <button onClick={() => handleSelectProfile(profile)}>Select</button>
//             <button onClick={() => handleDeleteProfile(profile.id)}>Delete</button>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default ProfileSelection;


// ProfileSelection.jsx
// import React, { useState, useContext } from 'react';
// import { useNavigate } from 'react-router-dom';
// import ProfileContext from './profilecontext';

// function ProfileSelection() {
//   const [newProfileName, setNewProfileName] = useState('');
//   const { profiles, setSelectedProfile, addProfile, removeProfile } = useContext(ProfileContext);
//   const navigate = useNavigate();

//   const handleCreateProfile = () => {
//     if (newProfileName) {
//       addProfile(newProfileName);
//       setNewProfileName('');
//     }
//   };

//   const handleSelectProfile = (profile) => {
//     setSelectedProfile(profile);
//     navigate('/');
//   };

//   const handleDeleteProfile = (profileId) => {
//     removeProfile(profileId);
//   };

//   return (
//     <div className="profile-selection">
//       <h1>Select or Create a Profile</h1>
//       <input
//         type="text"
//         value={newProfileName}
//         onChange={(e) => setNewProfileName(e.target.value)}
//         placeholder="Enter profile name"
//       />
//       <button onClick={handleCreateProfile}>Create Profile</button>
//       <ul>
//         {profiles.map(profile => (
//           <li key={profile.id}>
//             {profile.name}
//             <button onClick={() => handleSelectProfile(profile)}>Select</button>
//             <button onClick={() => handleDeleteProfile(profile.id)}>Delete</button>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default ProfileSelection;

import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ProfileContext from './profilecontext';

function ProfileSelection() {
  const [newProfileName, setNewProfileName] = useState('');
  const [loading, setLoading] = useState(true);
  const { profiles, setSelectedProfile, addProfile, removeProfile } = useContext(ProfileContext);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(false); // Set loading to false after profiles are fetched
  }, [profiles]);

  const handleCreateProfile = async () => {
    if (newProfileName) {
      await addProfile(newProfileName);
      setNewProfileName('');
    }
  };

  const handleSelectProfile = (profile) => {
    setSelectedProfile(profile);
    navigate('/');
  };

  const handleDeleteProfile = async (profileId) => {
    await removeProfile(profileId);
  };

  if (loading) return <div>Loading...</div>; // Display loading indicator while profiles are being fetched

  return (
    <div className="profile-selection">
      <h1>Select or Create a Profile</h1>
      <input
        type="text"
        value={newProfileName}
        onChange={(e) => setNewProfileName(e.target.value)}
        placeholder="Enter profile name"
      />
      <button onClick={handleCreateProfile}>Create Profile</button>
      <ul>
        {profiles.map(profile => (
          <li key={profile.id}>
            {profile.name}
            <button onClick={() => handleSelectProfile(profile)}>Select</button>
            <button onClick={() => handleDeleteProfile(profile.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProfileSelection;
