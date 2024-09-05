import React, { useState, useEffect } from "react";

const ScreamDetector = ({ onScoreUpdate, sensitivity = 1 }) => {
  const [dBLevel, setDbLevel] = useState(0);
  const [highestDbLevel, setHighestDbLevel] = useState(0);

  useEffect(() => {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const analyser = audioContext.createAnalyser();
    const sensitivityMultiplier = 5; // Adjust sensitivity here

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
        setHighestDbLevel((prev) => Math.max(prev, integerDb));
        onScoreUpdate(integerDb);
        requestAnimationFrame(update);
      };

      update();
    });

    return () => {
      audioContext.close();
    };
  }, [onScoreUpdate, sensitivity]);

  useEffect(() => {
    // Save the highest dB level to localStorage
    localStorage.setItem("highestDbLevel", highestDbLevel);
  }, [highestDbLevel]);

  // return <div>Current dB: {Math.round(dBLevel)}</div>;
};

export default ScreamDetector;
