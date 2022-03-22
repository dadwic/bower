import axios, { AxiosResponse, Canceler } from "axios";
import { AppThunk } from "./store";
import { API_PER_PAGE, API_KEY } from "../constants";
import { projectsLoading, projectsLoaded } from "./projectsSlice";
import { Project } from "types/Project";
import { SortType } from "types";

const CancelToken = axios.CancelToken;
let cancel: Canceler;

export const fetchAsync =
  (text: string, sort: SortType, page: number): AppThunk =>
  async (dispatch, getState) => {
    try {
      dispatch(projectsLoading());
      const response = await axios.get<Array<Project>>(
        `https://libraries.io/api/search?q=${text}&sort=${sort}&page=${page}&per_page=${API_PER_PAGE}&api_key=${API_KEY}`,
        {
          cancelToken: new CancelToken(function executor(c) {
            // An executor function receives a cancel function as a parameter
            cancel = c;
          }),
        }
      );
      // The value we return becomes the `fulfilled` action payload
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
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
          // http.ClientRequest in node.js
          console.log(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log("Error", error.message);
        }
      }
      console.log(error.config);
    }
  };
