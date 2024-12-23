import React from "react";
import Navbar from "./components/Navbar";
import HomePage from './pages/HomePage';
import "./styles/colors.css";  // Global colors
import "./styles/typography.css"; // Global typography
import "./styles/grid.css"; // Global grid system

const App = () => {
  return (
    <div>
      <Navbar />
      <HomePage />
    </div>
  );
};

export default App;