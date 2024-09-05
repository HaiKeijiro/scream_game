import { Link, Route, Routes, useNavigate } from "react-router-dom";
import Layout from "../component/Layout";
import Hewan from "/anjingkucing2.png";

function Home() {
  const refresh = () => {
    localStorage.clear();
  };

  return (
    <Layout>
      <div className="w-4/5 mx-auto flex flex-col items-center justify-center relative">
        <h1 className="text-[5rem] text-main text-center font-aptos-semibold uppercase mt-[5rem] leading-none">
          scream! <br /> and win the prize
        </h1>
        <Link
          to="/register"
          onClick={refresh}
          className="bg-[#FFD388] text-[3rem] uppercase font-medium px-[5vw] py-[1vh] rounded-[2rem] mt-[3rem] mx-auto"
        >
          join now
        </Link>
      </div>
      <div className="absolute bottom-10 right-0 left-0">
        <img
          src={Hewan}
          alt="hewan.png"
          className="bg-cover w-[100%] mx-auto -z-10"
        />
      </div>
    </Layout>
  );
}

export default Home;
