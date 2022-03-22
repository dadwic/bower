import React from "react";
import renderer from "react-test-renderer";
import Maybe from "../Maybe";

describe("Maybe", () => {
  it("should corretly match snapshot", () => {
    const tree = renderer
      .create(
        <Maybe condition={true}>
          <span>Visible</span>
        </Maybe>
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
