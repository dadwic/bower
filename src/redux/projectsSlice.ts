import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Project } from "types/Project";

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

export const projectsSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {
    projectsLoading: (state) => {
      state.loading = true;
    },
    // TODO:test
    projectsLoaded: (state, action: PayloadAction<any>) => {
      state.projects = action.payload.data;
      state.count = action.payload.total;
      state.loading = false;
    },
  },
});

export const { projectsLoading, projectsLoaded } = projectsSlice.actions;

export default projectsSlice.reducer;
