import React from "react";
import Humanize from "humanize-plus";
import { useSearchParams } from "react-router-dom";
import Box from "@mui/system/Box";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Pagination from "@mui/material/Pagination";
import Skeleton from "@mui/material/Skeleton";
import Avatar from "@mui/material/Avatar";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";
import Link from "@mui/material/Link";
import TimeIcon from "@mui/icons-material/AccessTime";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { useAppSelector } from "hooks";
import { stringAvatar } from "utils";
import {
  selectLoading,
  selectProjects,
  selectProjectsCount,
} from "redux/selectors";
import Maybe from "./Maybe";
import Sort from "./Sort";
import moment from "moment";

export default function Packages() {
  const loading = useAppSelector(selectLoading);
  const projects = useAppSelector(selectProjects);
  const count = useAppSelector(selectProjectsCount);
  let [searchParams, setSearchParams] = useSearchParams();
  let searchPage: number = Number(searchParams.get("page") || 1);

  const handleChangePage = (_: React.ChangeEvent<unknown>, value: number) => {
    setSearchParams({
      ...Object.fromEntries(searchParams.entries()),
      page: value.toString(),
    });
  };

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
                avatar={
                  <Skeleton
                    animation="wave"
                    variant="circular"
                    width={40}
                    height={40}
                  />
                }
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
        <Stack spacing={2}>
          <Sort />
          {projects.map((project, key) => (
            <Card key={key}>
              <CardHeader
                title={project.name}
                titleTypographyProps={{
                  title: project.name,
                }}
                avatar={
                  <Avatar
                    component={Link}
                    href={project.repository_url || "#"}
                    target="_blank"
                    {...stringAvatar(
                      (project.repository_url || "")
                        .split("/")
                        .splice(-2, 1)
                        .toString()
                    )}
                  />
                }
                action={
                  <IconButton
                    component="a"
                    href={project.repository_url || "#"}
                    target="_blank"
                  >
                    <OpenInNewIcon />
                  </IconButton>
                }
                subheader={
                  <Box
                    sx={{
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
                    <Stack
                      spacing={2}
                      direction="row"
                      alignItems="center"
                      sx={{ ml: 2, fontSize: 13 }}
                    >
                      <span>{Humanize.compactInteger(project.stars, 1)}</span>
                      <TimeIcon fontSize="small" />
                      <span>
                        {moment(
                          project.latest_release_published_at,
                          "YYYY-MM-DD"
                        ).fromNow()}
                      </span>
                    </Stack>
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
          <Pagination
            count={count}
            page={searchPage}
            variant="outlined"
            disabled={loading}
            onChange={handleChangePage}
          />
        </Stack>
      </Maybe>
    </>
  );
}
