import React, { createContext, useState, useEffect } from 'react';
import db from '../src/firebase';
import { doc, getDoc } from 'firebase/firestore';

const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
  const [selectedProfile, setSelectedProfile] = useState(null);

  useEffect(() => {
    // Fetch the selected profile from Firestore if you have a way to identify it
    const fetchSelectedProfile = async () => {
      // Replace 'selectedProfileId' with logic to retrieve the correct document ID
      const selectedProfileId = localStorage.getItem('selectedProfileId');
      if (selectedProfileId) {
        const profileDoc = await getDoc(doc(db, 'profiles', selectedProfileId));
        if (profileDoc.exists()) {
          setSelectedProfile({ id: profileDoc.id, ...profileDoc.data() });
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

