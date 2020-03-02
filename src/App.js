import React from 'react';
import logo from './logo.svg';
import './App.css';
import Restaurants from './components/Restaruants'

function App() {
  return (
    <div className="container" style={{ padding:"30px" }} >
       <h1 style={{ textAlign:"center" }}>Ramen Restaurants</h1>
      <Restaurants />
    </div>
  );
}

export default App;
