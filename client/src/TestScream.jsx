import React from "react";
import Hewan from "/anjingkucing2.png";

function TestScream() {
  return (
    <div className="w-56 h-40 bg-red-500 relative">
      <div
        className="absolute bottom-0 w-full"
        style={{
          height: `100%`,
          overflow: "hidden",
          transition: "height 0.5s ease-in-out",
        }}
      >
        <img src={Hewan} alt="" className="w-full" />
      </div>
    </div>
  );
}

export default TestScream;
