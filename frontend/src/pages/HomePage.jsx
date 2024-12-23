import React from "react";
import "../styles/grid.css";
import "../styles/colors.css";

const HomePage = () => {
  return (
    <div className="grid-container">
      <div className="grid-column-span-3" style={{ backgroundColor: "red" }}>
        Logo
      </div>
      <div className="grid-column-span-6" style={{ backgroundColor: "green" }}>
        Main Content
      </div>
      <div className="grid-column-span-3" style={{ backgroundColor: "blue" }}>
        Profile
      </div>
    </div>
  );
};

export default HomePage;