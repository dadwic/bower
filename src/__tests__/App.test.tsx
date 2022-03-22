import React from "react";
import renderer from "react-test-renderer";
import { BrowserRouter } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { store } from "redux/store";
import { Provider } from "react-redux";
import App from "../App";

describe("App", () => {
  it("should corretly match snapshot", () => {
    const theme = createTheme();

    const tree = renderer
      .create(
        <Provider store={store}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </ThemeProvider>
        </Provider>
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
