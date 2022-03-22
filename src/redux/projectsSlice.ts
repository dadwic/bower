import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Project, ProjectsState } from "types/Project";

export const initialState: ProjectsState = {
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
    projectsLoaded: (
      state,
      action: PayloadAction<{ data: Project[]; total: number }>
    ) => {
      state.projects = action.payload.data;
      state.count = action.payload.total;
      state.loading = false;
    },
    projectsFailure: (state, action: PayloadAction<string>) => {
      state.count = 0;
      state.projects = [];
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { projectsLoading, projectsLoaded, projectsFailure } =
  projectsSlice.actions;

export default projectsSlice.reducer;
