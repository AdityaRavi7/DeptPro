import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ref, get, push, remove, onValue } from 'firebase/database';
import ProfileContext from './profilecontext';
import "./../src/App.css"
import database from '../src/firebase';

function ProfileSelection() {
  const [profiles, setProfiles] = useState([]);
  const [newProfileName, setNewProfileName] = useState('');
  const { setSelectedProfile } = useContext(ProfileContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfiles = async () => {
      const profilesRef = ref(database, 'profiles');
      onValue(profilesRef, (snapshot) => {
        const profilesData = snapshot.val();
        const profilesList = profilesData ? Object.keys(profilesData).map(key => ({ id: key, ...profilesData[key] })) : [];
        setProfiles(profilesList);
      });
    };

    fetchProfiles();
  }, []);

  const handleCreateProfile = async () => {
    if (newProfileName) {
      try {
        const profilesRef = ref(database, 'profiles');
        const newProfileRef = await push(profilesRef, { name: newProfileName });
        setProfiles([...profiles, { id: newProfileRef.key, name: newProfileName }]);
        setNewProfileName('');
      } catch (e) {
        console.error("Error adding profile: ", e);
      }
    }
  };

  const handleSelectProfile = (profile) => {
    setSelectedProfile(profile);
    navigate('/');
  };

  const handleDeleteProfile = async (profile) => {
    try {
      const profileRef = ref(database, `profiles/${profile.id}`);
      await remove(profileRef);
      setProfiles(profiles.filter(p => p.id !== profile.id));
    } catch (e) {
      console.error("Error deleting profile: ", e);
    }
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
          <li key={profile.id}>
            {profile.name}
            <button onClick={() => handleSelectProfile(profile)}>Select</button>
            <button onClick={() => handleDeleteProfile(profile)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProfileSelection;
