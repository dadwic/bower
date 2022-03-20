import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import SearchPage from "pages/SearchPage";

export default function App() {
  return (
    <Routes>
      <Route path="search" element={<SearchPage />} />
      <Route path="*" element={<Navigate to="search" />} />
    </Routes>
  );
}
