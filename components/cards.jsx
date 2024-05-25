import React from 'react'
import ReactDOM from 'react-dom'


function Card({ onClick, title }) {
    return (
      <div className='card' onClick={onClick}>
        <h1>{title}</h1>
      </div>
    );
  }
      
  export default Card;