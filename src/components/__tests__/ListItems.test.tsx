import React from "react";
import { BrowserRouter } from "react-router-dom";
import renderer from "react-test-renderer";
import ListItems from "../ListItems";

describe("ListItems", () => {
  it("should corretly match snapshot", () => {
    const tree = renderer
      .create(
        <BrowserRouter>
          <ListItems />
        </BrowserRouter>
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
