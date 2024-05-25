import { useState } from 'react'
import rvce from './assets/rvce-logo.jpg'
import Card from '../components/cards'
import Motor from '../components/motor'
import MotorSeq from '../components/motorseq';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
// import Card from '@mui/material/Card';
// import CardActionArea from '@mui/material/CardActionArea';
// import CardContent from '@mui/material/CardContent';
// import Typography from '@mui/material/Typography';
// import Grid from '@mui/material/Grid';
import './App.css'


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
        Beyond entertainment, sequenced robotic movements also hold promise in various practical applications, such as industrial automation, healthcare assistance, and education.        </p>
      </div>
      <div className="container1">
      <Card  onClick={() => navigate('/Motor')} title="Motor"/>
      <Card  onClick={() => navigate('/Motor')} title="Audio"/>
      </div>
      <div className="container1">
      <Card  onClick={() => navigate('/Motor')} title="Servo"/> 
      <Card  onClick={() => navigate('/Motor')} title="Time"/>
      </div>
    </>
  )
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Motor" element={<Motor />} />
        <Route path="/MotorSeq" element={<MotorSeq />} />
      </Routes>
    </Router>
  );
}
export default App
