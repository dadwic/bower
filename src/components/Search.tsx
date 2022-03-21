import * as React from "react";
import { useSearchParams } from "react-router-dom";
import { styled, alpha } from "@mui/material/styles";
import Zoom from "@mui/material/Zoom";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";

const SearchBox = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.black, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.black, 0.2),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
  },
}));

const Search = () => {
  let [searchParams, setSearchParams] = useSearchParams();
  let searchText: string = searchParams.get("q") || "";
  const [value, setValue] = React.useState<string>(searchText);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      setSearchParams({ q: value.trim(), page: "1" });
    }, 500);

    return () => {
      clearTimeout(timeout);
    };
  }, [value]);

  React.useEffect(() => {
    // Reset search input if url has changed
    setValue(searchText);
  }, [searchText]);

  const handleClear = () => {
    setSearchParams({});
  };

  return (
    <SearchBox>
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>
      <StyledInputBase
        fullWidth
        placeholder="Search…"
        inputProps={{ "aria-label": "search" }}
        value={value}
        onChange={handleChange}
        endAdornment={
          <Zoom in={Boolean(value)}>
            <InputAdornment position="end">
              <IconButton size="small" onClick={handleClear}>
                <ClearIcon />
              </IconButton>
            </InputAdornment>
          </Zoom>
        }
      />
    </SearchBox>
  );
};

export default Search;
