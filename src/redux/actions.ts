import axios, { AxiosResponse, Canceler } from "axios";
import { AppThunk } from "./store";
import { API_PER_PAGE, API_KEY } from "../constants";
import {
  projectsLoading,
  projectsLoaded,
  projectsFailure,
} from "./projectsSlice";
import { Project } from "types/Project";
import { SortType } from "types";

const CancelToken = axios.CancelToken;
let cancel: Canceler;

export const fetchAsync =
  (text: string, sort: SortType, page: number): AppThunk =>
  async (dispatch) => {
    try {
      dispatch(projectsLoading());
      const response = await axios.get<Array<Project>>(
        `https://libraries.io/api/search?q=${text}&sort=${sort}&page=${page}&per_page=${API_PER_PAGE}&api_key=${API_KEY}`,
        {
          cancelToken: new CancelToken(function executor(c) {
            cancel = c;
          }),
        }
      );
      dispatch(
        projectsLoaded({
          data: response.data,
          total: Number(response.headers?.total),
        })
      );
    } catch (error: any) {
      if (axios.isCancel(error)) {
        console.log("Request canceled", error.message);
      } else {
        if (error.response) {
          const status = (error.response as AxiosResponse).status;
          if (status === 429) {
            return dispatch(
              projectsFailure("429 Too Many Requests! please try again")
            );
          }
          if (status >= 400 && status < 500) {
            return dispatch(projectsFailure("400 Bad Request"));
          }
          if (status >= 500) {
            return dispatch(projectsFailure("500 Internal Server Error"));
          }
        } else if (error.request) {
          console.log(error.request);
        } else {
          dispatch(projectsFailure(`Error ${error.message}`));
        }
      }
      console.log(error.config);
    }
  };
