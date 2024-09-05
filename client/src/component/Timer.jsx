// src/component/Timer.jsx
import React, { useEffect, useState } from 'react';

const Timer = ({ time, isActive, onTimeUp }) => {
  const [currentTime, setCurrentTime] = useState(time);

  useEffect(() => {
    setCurrentTime(time); // Reset currentTime when time prop changes
  }, [time]);

  useEffect(() => {
    if (isActive && currentTime > 0) {
      const timer = setTimeout(() => {
        setCurrentTime((prevTime) => prevTime - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (currentTime === 0) {
      onTimeUp();
    }
  }, [isActive, currentTime, onTimeUp]);

  return (
    <p className="text-[12em] bg-gradient-to-r from-[#E1BD82] to-[#A1783F] bg-clip-text text-transparent">
      {currentTime}
    </p>
  );
};

export default Timer;
