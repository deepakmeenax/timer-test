import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './worldClock.style.css';

export default function WorldClock() {
  const [timeZone, setTimeZone] = useState('Pacific/Auckland');
  const [currTime, setCurrTime] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const getCurrTime = async () => {
      try {
        const response = await axios.get(
          `http://worldtimeapi.org/api/timezone/${timeZone}`
        );

        setError('');
        const { datetime } = response.data;
        setCurrTime(
          new Date(
            new Date(datetime).toLocaleString('en-US', {
              timeZone,
            })
          )
        );
      } catch (err) {
        setCurrTime(null);
        setError(
          `*Error in fetching time, ${err?.message && err?.message} 
          ${err?.code && '(' + err?.code + ')'}`
        );
        console.error('Error fetching time:', err);
      }
    };

    getCurrTime();
  }, [timeZone]);

  useEffect(() => {
    let interval;

    if (currTime) {
      interval = setInterval(() => {
        const date = new Date(currTime);
        date.setSeconds(date.getSeconds() + 1);
        setCurrTime(date);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [currTime]);

  return (
    <div className="world-clock-container">
      <div className="world-clock">
        <div className="world-time">
          {`${currTime?.getHours().toString().padStart(2, '0') || '--'} :  
          ${currTime?.getMinutes().toString().padStart(2, '0') || '--'} : 
          ${currTime?.getSeconds().toString().padStart(2, '0') || '--'}`}
        </div>

        <div className="zone-selector">
          <select
            value={timeZone}
            onChange={(e) => setTimeZone(e.target.value)}
          >
            <option value="Pacific/Auckland">PST</option>
            <option value="Asia/Kolkata">IST</option>
          </select>
        </div>
      </div>
      <div className="error">{error && error}</div>
    </div>
  );
}
