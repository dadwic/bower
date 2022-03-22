import React from "react";
import renderer from "react-test-renderer";
import { BrowserRouter } from "react-router-dom";
import Sort from "../Sort";

describe("Sort", () => {
  it("should corretly match snapshot", () => {
    const tree = renderer
      .create(
        <BrowserRouter>
          <Sort />
        </BrowserRouter>
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
