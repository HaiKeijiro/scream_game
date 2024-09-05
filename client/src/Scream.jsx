import React, { useEffect, useState } from "react";
import Layout from "./Layout";
import Hewan from "/anjingkucing2.png";
import ScreamVisibility from "./component/ScreamVisibility";
import ScreamDetector from "./component/ScreamDetector";

function Scream() {
  const [time, setTime] = useState(60);
  const [visibility, setVisibility] = useState(1);

  const handleScream = (dBLevel) => {
    setVisibility(Math.max(1, Math.min(100, Math.round(dBLevel))));
    console.log(Math.max(1, Math.min(100, Math.round(dBLevel))));
  };

  // Timer
  useEffect(() => {
    if (time > 0) {
      const timer = setTimeout(() => setTime(time - 1), 1000);
      return () => clearTimeout(timer);
    } else if (time === 0) {
      endGame();
    }
  }, [time]);

  // End game
  const endGame = () => {
    // alert("game selesai")
  };

  const isScreaming = true;

  // Text gradient
  const styleGradient =
    "bg-gradient-to-r from-[#E1BD82] to-[#A1783F] bg-clip-text text-transparent";

  return (
    <Layout>
      <div className="w-4/5 mx-auto flex flex-col items-center justify-center relative text-center">
        {isScreaming ? (
          <>
            <h1
              className={`text-[5rem] font-aptos-semibold uppercase mt-[1em] leading-none ${styleGradient}`}
            >
              keep screaming <br /> for
            </h1>
            <p className={`text-[12em] ${styleGradient}`}>{time}</p>
            <ScreamDetector onScoreUpdate={handleScream} />
          </>
        ) : (
          <>
            <h1
              className={`text-[5em] font-aptos-semibold uppercase mt-[5rem] leading-none ${styleGradient}`}
            >
              your <br /> scream score
            </h1>
            <p className={`text-[20em] p-0 leading-none ${styleGradient}`}>
              {visibility}
            </p>
            <h6 className={`text-[5em] uppercase ${styleGradient}`}>
              excellent!
            </h6>
          </>
        )}
      </div>
      <div className="absolute bottom-10 right-0 left-0">
        {isScreaming ? <ScreamVisibility /> : Hewan}
      </div>
    </Layout>
  );
}

export default Scream;
