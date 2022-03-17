import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Footer from "./components/Footer";
import Search from "./pages/Search";

export default function App() {
  return (
    <Routes>
      <Route path="search" element={<Search />} />
      <Route path="*" element={<Navigate to="search" />} />
    </Routes>
  );
}
