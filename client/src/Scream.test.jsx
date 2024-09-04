import React from "react";
import Layout from "./Layout";
import Hewan from "/anjingkucing2.png";

function Scream() {
  const isScreaming = false;

  // Animal visibility
  const [visibility, setVisibility] = useState(0);

  const handleScream = (percentage) => {
    setVisibility(percentage);
  };

  return (
    <Layout>
      <div className="w-4/5 mx-auto flex flex-col items-center justify-center relative text-main text-center">
        {isScreaming ? (
          <>
            <h1 className="text-[5rem] font-aptos-semibold uppercase mt-[5rem] leading-none">
              keep screaming <br /> for
            </h1>
            <p className="text-[12rem]">8</p>
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

      <div
        className="relative bg-red-500 w-full h-full overflow-hidden"
        style={{
          height: `${visibility}%`,
          transition: "height 0.5s ease-in-out",
        }}
      >
        {/* Gambar hewan */}
        <img
          src={Hewan}
          alt="Dog and Cat"
          className="absolute bottom-0 w-full z-50"
        />

        {/* Button */}
        <div className="mt-4 flex gap-2">
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded"
            onClick={() => handleScream(10)}
          >
            10% Scream
          </button>
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded"
            onClick={() => handleScream(50)}
          >
            50% Scream
          </button>
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded"
            onClick={() => handleScream(100)}
          >
            100% Scream
          </button>
        </div>
      </div>
    </Layout>
  );
}

export default Scream;
