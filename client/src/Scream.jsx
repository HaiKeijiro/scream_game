import React, { useEffect, useState } from "react";
import Layout from "./Layout";
import ScreamVisibility from "./component/ScreamVisibility";

function Scream() {
  const isScreaming = true;

  // States
  const [time, setTime] = useState(60);
  const [visibility, setVisibility] = useState(0);

  const handleScream = (percentage) => {
    setVisibility(percentage);
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

  return (
    <Layout>
      <div className="w-4/5 mx-auto flex flex-col items-center justify-center relative text-main text-center">
        {isScreaming ? (
          <>
            <h1 className="text-[5rem] font-aptos-semibold uppercase mt-[5rem] leading-none">
              keep screaming <br /> for
            </h1>
            <p className="text-[12rem]">{time}</p>
            <ScreamVisibility visibility="100" />
          </>
        ) : (
          <>
            <h1 className="text-[5rem] font-aptos-semibold uppercase mt-[5rem] leading-none">
              your <br /> scream score
            </h1>
            <p className="text-[20rem] p-0 leading-none">100</p>
            <h6 className="text-[5rem] uppercase">excellent!</h6>
          </>
        )}
      </div>
    </Layout>
  );
}

export default Scream;
