import * as React from "react";
import { useSearchParams } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Footer from "components/Footer";
import Projects from "components/Projects";
import { useAppDispatch } from "hooks";
import ResponsiveDrawer from "components/ResponsiveDrawer";
import { fetchAsync } from "redux/actions";
import { SortType } from "types";

export default function SearchPage() {
  const dispatch = useAppDispatch();
  let [searchParams] = useSearchParams();
  let searchText: string = searchParams.get("q") || "";
  let searchPage: number = Number(searchParams.get("page") || 1);
  let searchSort: SortType = (searchParams.get("sort") as SortType) || "";

  React.useEffect(() => {
    dispatch(fetchAsync(searchText, searchSort, searchPage));
  }, [searchText, searchSort, searchPage]);

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <ResponsiveDrawer />
      <Box
        component="main"
        sx={{
          backgroundColor: (theme) =>
            theme.palette.mode === "light"
              ? theme.palette.grey[100]
              : theme.palette.grey[900],
          height: "100vh",
          overflow: "auto",
          display: "flex",
          flexDirection: "column",
          flexGrow: 1,
        }}
      >
        <Toolbar id="back-to-top-anchor" />
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Projects />
            </Grid>
          </Grid>
        </Container>
        <Footer />
      </Box>
    </Box>
  );
}
