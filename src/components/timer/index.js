import React, { useState, useEffect } from 'react';
import './timer.style.css';

const TimerComponent = ({ startTime, onRemove }) => {
  const [time, setTime] = useState(startTime);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime((prevTime) => prevTime - 1);
    }, 1000);

    if (time === 0) {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [time]);

  const getSimpleTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    return `${minutes.toString().padStart(2, '0')} : 
    ${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="timer">
      <div>
        {getSimpleTime(time)} {time === 0 && <span>Finished</span>}
      </div>
      <button onClick={onRemove}>Remove</button>
    </div>
  );
};

export default function Timer() {
  const [timers, setTimers] = useState([]);
  const [startTime, setStartTime] = useState('');
  const [error, setError] = useState('');

  const handleStart = () => {
    if (startTime > 0 && startTime < 9999999) {
      const newTimer = {
        id: Date.now(),
        startTime,
      };
      setTimers((prevTimers) => [...prevTimers, newTimer]);
      setStartTime('');
    } else {
      setError('*Value is too big max value 9999999');
    }
  };

  const handleRemove = (id) => {
    setTimers((prevTimers) => prevTimers.filter((timer) => timer.id !== id));
  };

  const handleInputChange = (event) => {
    setError('');
    if (event.target.value >= 0) {
      setStartTime(parseInt(event.target.value, 10));
    }
  };

  return (
    <div className="timer-container">
      <div className="timer-top">
        <div className="input-con">
          <input
            type="number"
            placeholder="Enter time in seconds"
            value={startTime}
            onChange={handleInputChange}
            onWheel={(event) => event.currentTarget.blur()}
          />
          <button onClick={handleStart}>Start</button>
        </div>
        <div className="error">{error && error}</div>
      </div>
      {timers.map((timer, index) => (
        <TimerComponent
          key={timer?.id}
          startTime={timer?.startTime}
          onRemove={() => handleRemove(timer?.id)}
        />
      ))}
    </div>
  );
}
