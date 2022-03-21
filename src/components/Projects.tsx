import * as React from "react";
import Box from "@mui/system/Box";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Skeleton from "@mui/material/Skeleton";
import Rating from "@mui/material/Rating";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { useAppSelector } from "hooks";
import { selectLoading, selectProjects } from "redux/projectsSlice";
import Maybe from "./Maybe";
import Sort from "./Sort";

export default function Packages() {
  const loading = useAppSelector(selectLoading);
  const projects = useAppSelector(selectProjects);

  return (
    <>
      <Maybe condition={loading}>
        <React.Fragment>
          <Skeleton
            sx={{
              width: { sm: "100%", md: "40%" },
              height: "calc(1.5em + 22px)",
            }}
          />
          {[...new Array(9)].map((_, key) => (
            <Card sx={{ mt: 2 }} key={key}>
              <CardHeader
                title={
                  <Skeleton
                    animation="wave"
                    height={20}
                    width="40%"
                    style={{ marginBottom: 6 }}
                  />
                }
                subheader={
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Rating
                      name="no-value"
                      size="small"
                      value={null}
                      readOnly
                    />
                    <Skeleton
                      animation="wave"
                      height={10}
                      width="10%"
                      style={{ marginLeft: 8 }}
                    />
                  </Box>
                }
              />
              <CardContent>
                <React.Fragment>
                  <Skeleton
                    animation="wave"
                    height={10}
                    style={{ marginBottom: 6 }}
                  />
                  <Skeleton animation="wave" height={10} width="80%" />
                </React.Fragment>
              </CardContent>
            </Card>
          ))}
        </React.Fragment>
      </Maybe>
      <Maybe condition={!loading}>
        <React.Fragment>
          <Sort />
          {projects.map((project, key) => (
            <Card sx={{ mb: 2 }} key={key}>
              <CardHeader
                title={project.name}
                titleTypographyProps={{
                  title: project.name,
                }}
                action={
                  <IconButton
                    component="a"
                    href={project?.repository_url || "#"}
                    target="_blank"
                  >
                    <OpenInNewIcon />
                  </IconButton>
                }
                subheader={
                  <Box
                    sx={{
                      width: 200,
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <Rating
                      size="small"
                      name="project-stars"
                      value={project?.stars}
                      readOnly
                    />
                    <Box sx={{ ml: 2, fontSize: 12 }}>{project?.stars}</Box>
                  </Box>
                }
              />
              <CardContent>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  component="p"
                >
                  {project?.description}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </React.Fragment>
      </Maybe>
    </>
  );
}
