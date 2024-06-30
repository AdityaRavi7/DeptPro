
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import rvce from './assets/rvce-logo.jpg';
import Card from '../components/cards';
import Motor from '../components/motor';
import MotorSeq from '../components/motorseq';
import Sequence1 from '../components/sequence1';
import Sequence2 from '../components/sequence2';
import Time from '../components/time';
import ProfileSelection from '../components/profileselection';
import { ProfileProvider } from '../components/profilecontext';
import db from './firebase.js';
import { onSnapshot, collection} from 'firebase/firestore';
import './App.css';

function Home() {
  const navigate = useNavigate();
  return (
    <>
      <div>
        <a href="" target="_blank">
          <img src={rvce} className="logo" alt="rvce logo" />
        </a>
      </div>
      <h1>Robotic Entertainment</h1>
      <div className="para">
        <p>
          Sequenced robotic movements in entertainment robots represent a fascinating fusion of technology and artistry, captivating audiences with their precise choreography and lifelike performances.
          In entertainment settings, such as theme parks, theaters, and exhibitions, sequenced robotic movements serve as a form of immersive storytelling, bringing characters to life in ways previously unimaginable.
          Beyond entertainment, sequenced robotic movements also hold promise in various practical applications, such as industrial automation, healthcare assistance, and education.
        </p>
      </div>
      <div className="container1">
        <Card onClick={() => navigate('/Motor')} title="Motor" />
        <Card onClick={() => navigate('/Sequence2')} title="Audio" />
      </div>
      <div className="container1">
        <Card onClick={() => navigate('/Sequence2')} title="Servo" />
        <Card onClick={() => navigate('/Time')} title="Time" />
      </div>
      <div className="container1">
        <Card onClick={() => navigate('/ProfileSelection')} title="Profiles" />
      </div>
    </>
  );
}

function App() {
  return (
    <ProfileProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Motor" element={<Motor />} />
          <Route path="/MotorSeq" element={<MotorSeq />} />
          <Route path="/Sequence1" element={<Sequence1 />} />
          <Route path="/Sequence2" element={<Sequence2 />} />
          <Route path="/Time" element={<Time />} />
          <Route path="/ProfileSelection" element={<ProfileSelection />} />
        </Routes>
      </Router>
    </ProfileProvider>
  );
}

export default App;
