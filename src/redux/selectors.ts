import { RootState } from "./store";

export const selectLoading = (state: RootState) => state.projects.loading;
export const selectProjects = (state: RootState) => state.projects.projects;
export const selectProjectsCount = (state: RootState) => state.projects.count;
export const selectProjectsError = (state: RootState) => state.projects.error;
