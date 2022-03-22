import React from "react";
import renderer from "react-test-renderer";
import Footer from "../Footer";

describe("Footer", () => {
  it("should corretly match snapshot", () => {
    const tree = renderer.create(<Footer />).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
