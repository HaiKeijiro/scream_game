import React, { useState } from "react";
import Layout from "./Layout";
import { useNavigate } from "react-router-dom";

function Register() {
  const [name, setName] = useState();
  const navigate = useNavigate();

  // Save to local storage
  const handleSubmit = () => {
    if (name.trim()) {
      localStorage.setItem("userName", name); // Save name to localStorage
      navigate("/scream"); // Navigate to Scrabble page
    }
  };

  return (
    <Layout>
      <div className="w-4/5 mx-auto flex flex-col items-center justify-center relative">
        <h1 className="text-[5rem] text-main text-center font-aptos-semibold uppercase mt-[5rem] leading-none">
          scream! <br /> and win the prize
        </h1>
        <div className="flex flex-col items-start w-full">
          <label htmlFor="name" className="text-[3rem] text-white">
            Name
          </label>
          <input
            type="text"
            placeholder="Your Name"
            className="text-[3rem] rounded-full px-[4rem] mt-[1rem] w-full"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <button
          onClick={handleSubmit}
          className="bg-[#FFD388] text-[3rem] uppercase px-[5vw] py-[1vh] rounded-[2rem] mt-[3rem]"
        >
          Register
        </button>
      </div>
    </Layout>
  );
}

export default Register;
