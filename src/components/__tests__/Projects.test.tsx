import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import renderer from "react-test-renderer";
import { store } from "redux/store";
import Projects from "../Projects";

describe("Projects", () => {
  it("should corretly match snapshot", () => {
    const tree = renderer
      .create(
        <Provider store={store}>
          <BrowserRouter>
            <Projects />
          </BrowserRouter>
        </Provider>
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
