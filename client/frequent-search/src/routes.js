import React from "react";
import { Routes, Route } from "react-router-dom";
import App from "./App"; // Your main component
import DisplayData from "./pages/DisplayData"; // Assuming you have a display data page

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/displayData" element={<DisplayData />} />
    </Routes>
  );
};

export default AppRoutes;
