import React from "react";
import renderer from "react-test-renderer";
import { Routes, Route, Navigate, BrowserRouter } from "react-router-dom";
import SearchPage from "pages/SearchPage";

describe("HomePage", () => {
  it("should corretly match snapshot", () => {
    const tree = renderer
      .create(
        <BrowserRouter>
          <Routes>
            <Route path="search" element={<SearchPage />} />
            <Route path="*" element={<Navigate to="search" />} />
          </Routes>
        </BrowserRouter>
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
