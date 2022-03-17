import * as React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";

export default function Header() {
  return (
    <Box
      component="header"
      sx={{
        background: "#ffcc2f",
        color: "#543729",
        padding: "10px 0",
        minHeight: 180,
        marginBottom: 20,
      }}
    >
      <Container maxWidth="md">
        <Box sx={{ display: "flex" }}>
          <Link>
            <img className="logo" src="/img/bower-logo.svg" alt="Bower logo" />
          </Link>
          <Box>
            <Typography
              variant="h2"
              component="h1"
              sx={{ fontWeight: "bold", letterSpacing: "-0.025em" }}
            >
              Bower Search
            </Typography>
            <Typography variant="h6" component="h4" sx={{ fontWeight: "bold" }}>
              Powered by <Link href="https://libraries.io/">libraries.io</Link>
            </Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
