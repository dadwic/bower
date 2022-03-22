import * as React from "react";
import { useSearchParams } from "react-router-dom";
import SelectUnstyled, {
  SelectUnstyledProps,
  selectUnstyledClasses,
} from "@mui/base/SelectUnstyled";
import OptionUnstyled, {
  optionUnstyledClasses,
} from "@mui/base/OptionUnstyled";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import PopperUnstyled from "@mui/base/PopperUnstyled";
import SortIcon from "@mui/icons-material/Sort";
import { styled } from "@mui/system";
import { SortType } from "types";

const blue = {
  100: "#DAECFF",
  200: "#99CCF3",
  400: "#3399FF",
  500: "#007FFF",
  600: "#0072E5",
  900: "#003A75",
};

const grey = {
  100: "#E7EBF0",
  200: "#E0E3E7",
  300: "#CDD2D7",
  400: "#B2BAC2",
  500: "#A0AAB4",
  600: "#6F7E8C",
  700: "#3E5060",
  800: "#2D3843",
  900: "#1A2027",
};

const StyledButton = styled("button")(
  ({ theme }) => `
  font-family: IBM Plex Sans, sans-serif;
  font-size: 0.875rem;
  box-sizing: border-box;
  min-height: calc(1.5em + 22px);
  min-width: 320px;
  background: ${theme.palette.mode === "dark" ? grey[900] : "#fff"};
  border: 1px solid ${theme.palette.mode === "dark" ? grey[800] : grey[300]};
  border-radius: 0.75em;
  margin-top: 0.5em;
  margin-left: 0.5em;
  padding: 10px;
  text-align: left;
  line-height: 1.5;
  color: ${theme.palette.mode === "dark" ? grey[300] : grey[900]};

  ${theme.breakpoints.down("sm")} {
    min-width: 0px;
    width: 100%;
  }

  &:hover {
    background: ${theme.palette.mode === "dark" ? "" : grey[100]};
    border-color: ${theme.palette.mode === "dark" ? grey[700] : grey[400]};
  }

  &.${selectUnstyledClasses.focusVisible} {
    outline: 3px solid ${theme.palette.mode === "dark" ? blue[600] : blue[100]};
  }

  &.${selectUnstyledClasses.expanded} {
    &::after {
      content: '▴';
    }
  }

  &::after {
    content: '▾';
    float: right;
  }
  `
);

const StyledListbox = styled("ul")(
  ({ theme }) => `
  font-family: IBM Plex Sans, sans-serif;
  font-size: 0.875rem;
  box-sizing: border-box;
  padding: 5px;
  margin: 10px 0;
  min-width: 320px;
  background: ${theme.palette.mode === "dark" ? grey[900] : "#fff"};
  border: 1px solid ${theme.palette.mode === "dark" ? grey[800] : grey[300]};
  border-radius: 0.75em;
  color: ${theme.palette.mode === "dark" ? grey[300] : grey[900]};
  overflow: auto;
  outline: 0px;
  `
);

const StyledOption = styled(OptionUnstyled)(
  ({ theme }) => `
  list-style: none;
  padding: 8px;
  border-radius: 0.45em;
  cursor: default;

  &:last-of-type {
    border-bottom: none;
  }

  &.${optionUnstyledClasses.selected} {
    background-color: ${theme.palette.mode === "dark" ? blue[900] : blue[100]};
    color: ${theme.palette.mode === "dark" ? blue[100] : blue[900]};
  }

  &.${optionUnstyledClasses.highlighted} {
    background-color: ${theme.palette.mode === "dark" ? grey[800] : grey[100]};
    color: ${theme.palette.mode === "dark" ? grey[300] : grey[900]};
  }

  &.${optionUnstyledClasses.highlighted}.${optionUnstyledClasses.selected} {
    background-color: ${theme.palette.mode === "dark" ? blue[900] : blue[100]};
    color: ${theme.palette.mode === "dark" ? blue[100] : blue[900]};
  }

  &.${optionUnstyledClasses.disabled} {
    color: ${theme.palette.mode === "dark" ? grey[700] : grey[400]};
  }

  &:hover:not(.${optionUnstyledClasses.disabled}) {
    background-color: ${theme.palette.mode === "dark" ? grey[800] : grey[100]};
    color: ${theme.palette.mode === "dark" ? grey[300] : grey[900]};
  }
  `
);

const StyledPopper = styled(PopperUnstyled)`
  z-index: 1;
`;

function CustomSelect(props: SelectUnstyledProps<string>) {
  const components: SelectUnstyledProps<string>["components"] = {
    Root: StyledButton,
    Listbox: StyledListbox,
    Popper: StyledPopper,
    ...props.components,
  };

  return <SelectUnstyled {...props} components={components} />;
}

export default function Sort() {
  let [searchParams, setSearchParams] = useSearchParams();
  let searchSort: SortType = (searchParams.get("sort") as SortType) || "";
  const [value, setValue] = React.useState<string | null>(searchSort);

  React.useEffect(() => {
    if (value) {
      setSearchParams({
        ...Object.fromEntries(searchParams.entries()),
        sort: value,
      });
    } else {
      searchParams.delete("sort");
      setSearchParams(Object.fromEntries(searchParams.entries()));
    }
  }, [value]);

  const handleReset = () => {
    setSearchParams({});
  };

  return (
    <Stack spacing={2} direction="row" alignItems="center">
      <SortIcon />
      <CustomSelect value={value} onChange={setValue}>
        <StyledOption value="">Relevance</StyledOption>
        <StyledOption value="rank">SourceRank</StyledOption>
        <StyledOption value="stars">Stars</StyledOption>
        <StyledOption value="dependents_count">Dependents</StyledOption>
        <StyledOption value="dependent_repos_count">Most Used</StyledOption>
        <StyledOption value="latest_release_published_at">
          Latest Release
        </StyledOption>
        <StyledOption value="contributions_count">Contributors</StyledOption>
        <StyledOption value="created_at">Newest</StyledOption>
      </CustomSelect>
      <Button onClick={handleReset} color="inherit" size="small">
        Reset
      </Button>
    </Stack>
  );
}
