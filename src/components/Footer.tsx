import React from "react";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import Fab from "@mui/material/Fab";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import ScrollTop from "./ScrollTop";

export interface Props {
  window?: () => Window;
  children?: React.ReactElement | null;
}

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary">
      {`Copyright © ${new Date().getFullYear()}`}
    </Typography>
  );
}

export default function Footer(props: Props) {
  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
        mt: "auto",
        backgroundColor: (theme) =>
          theme.palette.mode === "light"
            ? theme.palette.grey[200]
            : theme.palette.grey[800],
      }}
    >
      <Container maxWidth="sm">
        <Typography variant="body1">
          Made with ❤️ by{" "}
          <Link color="inherit" href="http://dadwic.com/" target="_blank">
            @dadwic
          </Link>
        </Typography>
        <Copyright />
      </Container>
      <ScrollTop {...props}>
        <Fab color="info" size="small" aria-label="scroll back to top">
          <KeyboardArrowUpIcon />
        </Fab>
      </ScrollTop>
    </Box>
  );
}
