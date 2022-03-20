import * as React from "react";
import { useSearchParams } from "react-router-dom";
import { styled } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import useMediaQuery from "@mui/material/useMediaQuery";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import MenuIcon from "@mui/icons-material/Menu";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import Footer from "components/Footer";
import Search from "components/Search";
import Packages from "components/Packages";
import { mainListItems } from "components/listItems";
import { API_KEY, API_PER_PAGE } from "../constants";
import { SortType, AppBarProps } from "types";

const drawerWidth: number = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
    }),
  },
}));

export default function SearchPage() {
  const [data, setData] = React.useState([]);
  const [open, setOpen] = React.useState(true);
  const [loading, setLoading] = React.useState(true);
  const matches = useMediaQuery("(max-width:600px)");

  let [searchParams, setSearchParams] = useSearchParams();
  let searchText: string = searchParams.get("q") || "";
  let searchPage: number = Number(searchParams.get("page") || 1);
  let searchSort: SortType = (searchParams.get("sort") as SortType) || "";

  React.useEffect(() => {
    setOpen(!matches);
  }, [matches]);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  React.useEffect(() => {
    let abortController = new AbortController();

    async function searchPackages() {
      setLoading(true);
      let response = await fetch(
        `https://libraries.io/api/search?q=${searchText}&sort=${searchSort}&page=${searchPage}&per_page=${API_PER_PAGE}&api_key=${API_KEY}`,
        {
          signal: abortController.signal,
        }
      );
      if (!abortController.signal.aborted) {
        let data = await response.json();
        setLoading(false);
        setData(data);
      }
    }

    // Get data
    searchPackages();

    return () => {
      abortController.abort();
    };
  }, [searchText]);

  const handleChangeSearchText = (text: string) => {
    setSearchParams({ q: text.trim(), page: "1" });
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="absolute" elevation={1} open={open}>
        <Toolbar
          sx={{
            pr: "24px", // keep right padding when drawer closed
          }}
        >
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={toggleDrawer}
            sx={{
              marginRight: "36px",
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Search initialValue={searchText} onChange={handleChangeSearchText} />
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <Toolbar
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-around",
            px: [1],
          }}
        >
          <Typography
            component="div"
            variant="h6"
            color="inherit"
            sx={{ fontWeight: "bold", display: { xs: "none", sm: "block" } }}
            noWrap
          >
            Bower Search
          </Typography>
          <IconButton onClick={toggleDrawer}>
            <MenuOpenIcon />
          </IconButton>
        </Toolbar>
        <Divider />
        <List component="nav">{mainListItems}</List>
      </Drawer>
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
        <Toolbar />
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Packages loading={loading} />
            </Grid>
          </Grid>
        </Container>
        <Footer />
      </Box>
    </Box>
  );
}
