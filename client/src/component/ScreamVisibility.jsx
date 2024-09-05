import React from "react";
import Hewan from "/anjingkucing.png"; // Update with the correct path

const ScreamVisibility = () => {
  const visibility = localStorage.getItem("highestDbLevel")

  return (
    <div
      className="relative w-full overflow-hidden"
      style={{
        height: "900px", // Set a fixed height for the container
      }}
    >
      <div
        className="absolute bottom-0 w-full"
        style={{
          height: `${visibility == 100 ? "100" : visibility}%`,
          overflow: "hidden",
          transition: "height 0.5s ease-in-out",
        }}
      >
        <img
          src={Hewan}
          alt="Dog and Cat"
          className="bottom-0 w-full h-full object-cover"
        />
      </div>
    </div>
  );
};

export default ScreamVisibility;
