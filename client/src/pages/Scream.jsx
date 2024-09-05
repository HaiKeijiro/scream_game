import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../component/Layout";
import Hewan from "/anjingkucing2.png";
import ScreamVisibility from "../component/ScreamVisibility";
import ScreamDetector from "../component/ScreamDetector";

function Scream() {
  // States
  const [time, setTime] = useState(60);
  const [isGameActive, setIsGameActive] = useState(false);
  const [isTimeOver, setIsTimeOver] = useState(false);
  const [score, setScore] = useState(0);
  const [currentScore, setCurrentScore] = useState(0);

  // Navigation
  const navigate = useNavigate();

  // Load score from localStorage when the component mounts
  useEffect(() => {
    const storedScore = parseInt(localStorage.getItem("highestDbLevel")) || 0;
    setScore(storedScore);
  }, []);

  // Timer for the game
  useEffect(() => {
    let timer;
    if (isGameActive && time > 0) {
      timer = setInterval(() => {
        setTime((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(timer);
            setIsTimeOver(true);
            setIsGameActive(false);
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isGameActive]);

  // Check for game over conditions
  useEffect(() => {
    if (time === 0 || score >= 100) {
      endGame();
    }
  }, [time, score]);

  // Update visibility and score based on scream
  const handleScream = useCallback(
    (dBLevel) => {
      if (isGameActive && !isTimeOver) {
        // Calculate scream score within the range of 1 to 100
        const screamScore = Math.max(1, Math.min(100, Math.round(dBLevel)));
        setCurrentScore(screamScore);

        // Retrieve the highest score from localStorage (default to 0 if not present)
        const highestScore =
          parseInt(localStorage.getItem("highestDbLevel")) || 0;

        // If the new score is higher, update the state and localStorage
        if (screamScore > highestScore) {
          setScore(screamScore);
          localStorage.setItem("highestDbLevel", screamScore); // Store the highest score
        }
      }
    },
    [isGameActive, isTimeOver]
  );

  // End game function
  const endGame = useCallback(() => {
    setIsGameActive(false);
    setIsTimeOver(true);

    const userName = localStorage.getItem("userName");

    fetch("http://localhost:4000/api/save", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: userName, score: score }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data.message);
      })
      .catch((error) => {
        console.error("Error saving score:", error);
      });

    setTimeout(() => {
      navigate("/");
    }, 5000);
  }, [score, navigate]);

  // Start game function
  const startGame = () => {
    setIsGameActive(true);
    setTime(60); // Reset time
    setIsTimeOver(false);
    setScore(0); // Reset score
    setCurrentScore(0); // Reset current score
  };

  // Text gradient
  const styleGradient =
    "bg-gradient-to-r from-[#E1BD82] to-[#A1783F] bg-clip-text text-transparent";

  return (
    <Layout>
      <div className="w-4/5 mx-auto flex flex-col items-center justify-center relative text-center">
        {isGameActive ? (
          <>
            <h1
              className={`text-[5rem] font-aptos-semibold uppercase mt-[1em] leading-none ${styleGradient}`}
            >
              keep screaming <br /> for
            </h1>
            <p className={`text-[12em] ${styleGradient}`}>{time}</p>
            <ScreamDetector onScoreUpdate={handleScream} />
          </>
        ) : isTimeOver ? (
          <>
            <h1
              className={`text-[5em] font-aptos-semibold uppercase mt-[5rem] leading-none ${styleGradient}`}
            >
              your <br /> scream score
            </h1>
            <p className={`text-[15em] p-0 leading-none ${styleGradient}`}>
              {score}
            </p>
            <h6
              className={`text-[4em] uppercase font-aptos-bold mt-[2rem] ${styleGradient}`}
            >
              {score === 100
                ? "excellent!"
                : score >= 80
                ? "great! just little more"
                : "need more practice"}
            </h6>
          </>
        ) : (
          <>
            <h1
              className={`text-[5rem] font-aptos-semibold uppercase mt-[1em] leading-none ${styleGradient}`}
            >
              ready to <br /> scream?
            </h1>
            <button
              onClick={startGame}
              className="bg-[#FFD388] text-[3rem] uppercase font-medium px-[5vw] py-[1vh] rounded-[2rem] mt-[3rem] mx-auto"
            >
              Start
            </button>
          </>
        )}
      </div>
      <div className="absolute bottom-10 right-0 left-0">
        {isGameActive ? (
          <ScreamVisibility score={currentScore} />
        ) : (
          <img src={Hewan} alt="Hewan" className="" />
        )}
      </div>
    </Layout>
  );
}

export default Scream;
