import React from 'react'
import ReactDOM from 'react-dom'
import Card from './cards';
import MotorSeq from './motorseq';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


function Motor({}) {
    const navigate = useNavigate();

    const handleCardClick = (title) => {
        navigate('/MotorSeq', { state: { title } });
    };
    return (
      <div className='motor'>
        <h1>Motor page</h1>
        <Card  onClick={() =>  handleCardClick('Motor1', '/MotorSeq')} title="Motor1"/>
        <Card  onClick={() => handleCardClick('Motor2', '/MotorSeq')} title="Motor2"/>
        <Card  onClick={() => handleCardClick('Motor3', '/MotorSeq')} title="Motor3"/>
        <Card  onClick={() => handleCardClick('Motor4', '/MotorSeq')} title="Motor4"/>
        <Card  onClick={() => handleCardClick('Motor5', '/MotorSeq')} title="Motor5"/>
        <Card  onClick={() => handleCardClick('Motor6', '/MotorSeq')} title="Motor6"/>
        <Card  onClick={() => handleCardClick('Motor7', '/MotorSeq')} title="Motor7"/>

      </div>
    );
  }
  
  export default Motor;