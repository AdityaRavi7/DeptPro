// // // ProfileContext.jsx
// // import React, { createContext, useState } from 'react';

// // const ProfileContext = createContext();

// // export const ProfileProvider = ({ children }) => {
// //   const [selectedProfile, setSelectedProfile] = useState(null);

// //   return (
// //     <ProfileContext.Provider value={{ selectedProfile, setSelectedProfile }}>
// //       {children}
// //     </ProfileContext.Provider>
// //   );
// // };

// // export default ProfileContext;


// // profilecontext.jsx
// // import React, { createContext, useState, useEffect } from 'react';
// // import { db } from '../firebase';
// // import { collection, getDocs, addDoc, deleteDoc, doc } from "firebase/firestore";

// // const ProfileContext = createContext();

// // export const ProfileProvider = ({ children }) => {
// //   const [profiles, setProfiles] = useState([]);
// //   const [selectedProfile, setSelectedProfile] = useState(null);

// //   useEffect(() => {
// //     const fetchProfiles = async () => {
// //       const profilesCollection = collection(db, "profiles");
// //       const profileSnapshot = await getDocs(profilesCollection);
// //       const profileList = profileSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
// //       setProfiles(profileList);
// //     };

// //     fetchProfiles();
// //   }, []);

// //   const addProfile = async (profileName) => {
// //     const profilesCollection = collection(db, "profiles");
// //     const docRef = await addDoc(profilesCollection, { name: profileName });
// //     setProfiles([...profiles, { id: docRef.id, name: profileName }]);
// //   };

// //   const removeProfile = async (profileId) => {
// //     const profileDoc = doc(db, "profiles", profileId);
// //     await deleteDoc(profileDoc);
// //     setProfiles(profiles.filter(profile => profile.id !== profileId));
// //   };

// //   return (
// //     <ProfileContext.Provider value={{ profiles, selectedProfile, setSelectedProfile, addProfile, removeProfile }}>
// //       {children}
// //     </ProfileContext.Provider>
// //   );
// // };

// // export default ProfileContext;

// import React, { createContext, useState, useEffect } from 'react';
// import { db } from '../firebase';
// import { collection, getDocs, addDoc, deleteDoc, doc } from "firebase/firestore";

// const ProfileContext = createContext();

// export const ProfileProvider = ({ children }) => {
//   const [profiles, setProfiles] = useState([]);
//   const [selectedProfile, setSelectedProfile] = useState(null);

//   useEffect(() => {
//     const fetchProfiles = async () => {
//       console.log("Fetching profiles...");
//       try {
//         const profilesCollection = collection(db, "profiles");
//         const profileSnapshot = await getDocs(profilesCollection);
//         const profileList = profileSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
//         setProfiles(profileList);
//         console.log("Profiles fetched:", profileList);
//       } catch (error) {
//         console.error("Error fetching profiles:", error);
//       }
//     };

//     fetchProfiles();
//   }, []);

//   const addProfile = async (profileName) => {
//     console.log("Adding profile:", profileName);
//     try {
//       const profilesCollection = collection(db, "profiles");
//       const docRef = await addDoc(profilesCollection, { name: profileName });
//       setProfiles(prevProfiles => [...prevProfiles, { id: docRef.id, name: profileName }]);
//       console.log("Profile added:", { id: docRef.id, name: profileName });
//     } catch (error) {
//       console.error("Error adding profile:", error);
//     }
//   };

//   const removeProfile = async (profileId) => {
//     console.log("Removing profile:", profileId);
//     try {
//       const profileDoc = doc(db, "profiles", profileId);
//       await deleteDoc(profileDoc);
//       setProfiles(prevProfiles => prevProfiles.filter(profile => profile.id !== profileId));
//       console.log("Profile removed:", profileId);
//     } catch (error) {
//       console.error("Error removing profile:", error);
//     }
//   };

//   return (
//     <ProfileContext.Provider value={{ profiles, selectedProfile, setSelectedProfile, addProfile, removeProfile }}>
//       {children}
//     </ProfileContext.Provider>
//   );
// };

// export default ProfileContext;


import React, { createContext, useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, getDocs, addDoc, deleteDoc, doc } from 'firebase/firestore';

const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
  const [profiles, setProfiles] = useState([]);
  const [selectedProfile, setSelectedProfile] = useState(null);

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const profilesCollection = collection(db, 'profiles');
        const profileSnapshot = await getDocs(profilesCollection);
        const profileList = profileSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setProfiles(profileList);
      } catch (error) {
        console.error('Error fetching profiles:', error);
      }
    };

    fetchProfiles();
  }, []);

  const addProfile = async (profileName) => {
    try {
      const profilesCollection = collection(db, 'profiles');
      const docRef = await addDoc(profilesCollection, { name: profileName });
      setProfiles(prevProfiles => [...prevProfiles, { id: docRef.id, name: profileName }]);
    } catch (error) {
      console.error('Error adding profile:', error);
    }
  };

  const removeProfile = async (profileId) => {
    try {
      const profileDoc = doc(db, 'profiles', profileId);
      await deleteDoc(profileDoc);
      setProfiles(prevProfiles => prevProfiles.filter(profile => profile.id !== profileId));
    } catch (error) {
      console.error('Error removing profile:', error);
    }
  };

  return (
    <ProfileContext.Provider value={{ profiles, selectedProfile, setSelectedProfile, addProfile, removeProfile }}>
      {children}
    </ProfileContext.Provider>
  );
};

export default ProfileContext;

