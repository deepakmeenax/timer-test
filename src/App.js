import React from 'react';
import './App.css';
import WorldClock from './components/worldClock';
import Timer from './components/timer';

export default function App() {
  return (
    <div className="app-container">
      <WorldClock />
      <Timer />
    </div>
  );
}
