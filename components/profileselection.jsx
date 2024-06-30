import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import ProfileContext from './profilecontext';
import db from '../src/firebase';
import { collection, addDoc, getDocs, deleteDoc, doc } from 'firebase/firestore';

function ProfileSelection() {
  const [profiles, setProfiles] = useState([]);
  const [newProfileName, setNewProfileName] = useState('');
  const { setSelectedProfile } = useContext(ProfileContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfiles = async () => {
      const querySnapshot = await getDocs(collection(db, 'profiles'));
      const profilesData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setProfiles(profilesData);
    };

    fetchProfiles();
  }, []);

  const handleCreateProfile = async () => {
    if (newProfileName) {
      try {
        const docRef = await addDoc(collection(db, 'profiles'), { name: newProfileName });
        setProfiles([...profiles, { id: docRef.id, name: newProfileName }]);
        setNewProfileName('');
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    }
  };

  const handleSelectProfile = (profile) => {
    setSelectedProfile(profile);
    navigate('/');
  };

  const handleDeleteProfile = async (profile) => {
    try {
      await deleteDoc(doc(db, 'profiles', profile.id));
      setProfiles(profiles.filter(p => p.id !== profile.id));
    } catch (e) {
      console.error("Error deleting document: ", e);
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
