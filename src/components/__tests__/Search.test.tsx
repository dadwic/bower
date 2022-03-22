import React from "react";
import { BrowserRouter } from "react-router-dom";
import renderer from "react-test-renderer";
import Search from "../Search";

describe("Search", () => {
  it("should corretly match snapshot", () => {
    const tree = renderer
      .create(
        <BrowserRouter>
          <Search />
        </BrowserRouter>
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
