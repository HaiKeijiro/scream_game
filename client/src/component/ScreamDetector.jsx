import React, { useState, useEffect } from "react";

const ScreamDetector = ({ onScoreUpdate }) => {
  const [dBLevel, setDbLevel] = useState(0);

  useEffect(() => {
    const audioContext = new (window.AudioContext ||
      window.AudioContext)();
    const analyser = audioContext.createAnalyser();

    navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
      const source = audioContext.createMediaStreamSource(stream);
      source.connect(analyser);

      const dataArray = new Uint8Array(analyser.frequencyBinCount);

      const update = () => {
        analyser.getByteFrequencyData(dataArray);
        const max = Math.max(...dataArray);
        const dB = 20 * Math.log10(max / 128);
        setDbLevel(dB);
        onScoreUpdate(Math.min(Math.max(0, dB), 100));
        requestAnimationFrame(update);
      };

      update();
    });
  }, [onScoreUpdate]);

  return <div>Current dB: {Math.round(dBLevel)}</div>;
};

export default ScreamDetector;
