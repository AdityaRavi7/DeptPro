// ProfileSelection.jsx
import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import ProfileContext from './profilecontext';

function ProfileSelection() {
  const [profiles, setProfiles] = useState([]);
  const [newProfileName, setNewProfileName] = useState('');
  const { setSelectedProfile } = useContext(ProfileContext);
  const navigate = useNavigate();

  useEffect(() => {
    const storedProfiles = JSON.parse(localStorage.getItem('profiles')) || [];
    setProfiles(storedProfiles);
  }, []);

  const handleCreateProfile = () => {
    if (newProfileName) {
      const updatedProfiles = [...profiles, newProfileName];
      setProfiles(updatedProfiles);
      localStorage.setItem('profiles', JSON.stringify(updatedProfiles));
      setNewProfileName('');
    }
  };

  const handleSelectProfile = (profile) => {
    setSelectedProfile(profile);
    navigate('/');
  };

  const handleDeleteProfile = (profile) => {
    const updatedProfiles = profiles.filter(p => p !== profile);
    setProfiles(updatedProfiles);
    localStorage.setItem('profiles', JSON.stringify(updatedProfiles));
    localStorage.removeItem(profile);
  };

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
          <li key={profile}>
            {profile}
            <button onClick={() => handleSelectProfile(profile)}>Select</button>
            <button onClick={() => handleDeleteProfile(profile)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProfileSelection;
