import { Link, Route, Routes, useNavigate } from "react-router-dom";
import Layout from "./Layout";
import Hewan from "/anjingkucing2.png";

function Home() {
  return (
    <Layout>
      <div className="w-4/5 mx-auto flex flex-col items-center justify-center relative">
        <h1 className="text-[5rem] text-main text-center font-aptos-semibold uppercase mt-[5rem] leading-none">
          scream! <br /> and win the prize
        </h1>
        <Link
          to="/register"
          className="bg-[#FFD388] text-[3rem] uppercase font-medium px-[5vw] py-[1vh] rounded-[2rem] mt-[3rem] mx-auto"
        >
          join now
        </Link>
      </div>
      <img
        src={Hewan}
        alt="hewan.png"
        className="bg-cover mx-auto absolute bottom-0 left-0 right-0"
      />
    </Layout>
  );
}

export default Home;
