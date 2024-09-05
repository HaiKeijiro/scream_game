import React, { useState, useEffect } from "react";

const ScreamDetector = ({ onScoreUpdate, sensitivity = 1 }) => {
  const [dBLevel, setDbLevel] = useState(0);
  const [highestDbLevel, setHighestDbLevel] = useState(() => {
    // Get the highest dB level from localStorage on initial render
    const savedDbLevel = localStorage.getItem("highestDbLevel");
    return savedDbLevel ? parseInt(savedDbLevel, 10) : 0;
  });

  useEffect(() => {
    const audioContext = new (window.AudioContext ||
      window.webkitAudioContext)();
    const analyser = audioContext.createAnalyser();
    const sensitivityMultiplier = 10; // Adjust sensitivity here

    navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
      const source = audioContext.createMediaStreamSource(stream);
      source.connect(analyser);

      const dataArray = new Uint8Array(analyser.frequencyBinCount);

      const update = () => {
        analyser.getByteFrequencyData(dataArray);
        const max = Math.max(...dataArray);
        const dB = 20 * Math.log10(max / 128) * sensitivityMultiplier;
        const clampedDb = Math.max(0, Math.min(100, dB));
        const integerDb = Math.max(1, Math.round(clampedDb));
        setDbLevel(integerDb);
        setHighestDbLevel((prev) => {
          const newHighest = Math.max(prev, integerDb);
          if (newHighest !== prev) {
            localStorage.setItem("highestDbLevel", newHighest);
          }
          return newHighest;
        });
        onScoreUpdate(integerDb);
        requestAnimationFrame(update);
      };

      update();
    });

    return () => {
      audioContext.close();
    };
  }, [onScoreUpdate, sensitivity]);

  return <div>Current dB: {Math.round(dBLevel)}</div>;
};

export default ScreamDetector;
