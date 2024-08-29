import React, { createContext, useState, useEffect } from 'react';
import { ref, get } from 'firebase/database';
import database from '../src/firebase';

const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
  const [selectedProfile, setSelectedProfile] = useState(null);

  useEffect(() => {
    // Fetch the selected profile from Realtime Database
    const fetchSelectedProfile = async () => {
      const selectedProfileId = localStorage.getItem('selectedProfileId');
      if (selectedProfileId) {
        const profileRef = ref(database, `profiles/${selectedProfileId}`);
        const profileSnap = await get(profileRef);
        if (profileSnap.exists()) {
          setSelectedProfile({ id: selectedProfileId, ...profileSnap.val() });
        }
      }
    };

    fetchSelectedProfile();
  }, []);

  useEffect(() => {
    // Update localStorage whenever the selected profile changes
    if (selectedProfile) {
      localStorage.setItem('selectedProfile', JSON.stringify(selectedProfile));
      localStorage.setItem('selectedProfileId', selectedProfile.id);
    } else {
      localStorage.removeItem('selectedProfile');
      localStorage.removeItem('selectedProfileId');
    }
  }, [selectedProfile]);

  return (
    <ProfileContext.Provider value={{ selectedProfile, setSelectedProfile }}>
      {children}
    </ProfileContext.Provider>
  );
};

export default ProfileContext;
