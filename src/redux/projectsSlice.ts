import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Axios, { AxiosResponse, Canceler } from "axios";
import { RootState, AppThunk } from "redux/store";
import { API_PER_PAGE, API_KEY } from "../constants";
import { Project } from "types/Project";
import { SortType } from "types";

export interface projectsState {
  count: number;
  error: string | null;
  loading: boolean;
  projects: Project[];
}

const initialState: projectsState = {
  count: 0,
  error: null,
  loading: false,
  projects: [],
};

let cancelRequest: Canceler;

export const projectsSlice = createSlice({
  name: "projects",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    projectsLoading: (state) => {
      state.loading = true;
    },
    // Use the PayloadAction type to declare the contents of `action.payload`
    projectsLoaded: (state, action: PayloadAction<Project[]>) => {
      state.projects = action.payload;
      state.loading = false;
    },
  },
});

export const { projectsLoading, projectsLoaded } = projectsSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.projects.value)`
export const selectLoading = (state: RootState) => state.projects.loading;
export const selectProjects = (state: RootState) => state.projects.projects;

// We can also write thunks by hand, which may contain both sync and async logic.
// Here's an example of conditionally dispatching actions based on current state.
export const fetchAsync =
  (text: string, sort: SortType, page: number): AppThunk =>
  async (dispatch, getState) => {
    try {
      dispatch(projectsLoading());
      const response = await Axios.get<Array<Project>>(
        `https://libraries.io/api/search?q=${text}&sort=${sort}&page=${page}&per_page=${API_PER_PAGE}&api_key=${API_KEY}`,
        {
          cancelToken: new Axios.CancelToken((ct) => {
            cancelRequest = ct;
          }),
        }
      );
      // The value we return becomes the `fulfilled` action payload
      dispatch(projectsLoaded(response.data));
    } catch (error: any) {
      /*
        in a bigger project we could extract this block as
        a separate error handling utility which does all the 
        error handling and maybe report the error to a service like sentry
        example: handleError(error, dispatch, fetchProjectsError)
        or handleError(error, (message: string) => dispatch(fetchProjectsError(message)))
      */
      return error.response;
    }
  };

export default projectsSlice.reducer;
