import React from "react";
import renderer from "react-test-renderer";
import Fab from "@mui/material/Fab";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import ScrollTop from "../ScrollTop";

describe("ScrollTop", () => {
  it("should corretly match snapshot", () => {
    const tree = renderer
      .create(
        <ScrollTop>
          <Fab color="secondary" size="small" aria-label="scroll back to top">
            <KeyboardArrowUpIcon />
          </Fab>
        </ScrollTop>
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
