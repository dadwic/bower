import { AnyAction } from "redux";
import projectsRedcuer, {
  initialState,
  projectsLoaded,
  projectsFailure,
} from "./projectsSlice";
import { projectsMock } from "__mocks__";
import { ProjectsState } from "types/Project";

describe("projectsRedcuer", () => {
  it("should return the initial state", () => {
    expect(projectsRedcuer(undefined, {} as AnyAction)).toEqual({
      ...initialState,
    });
  });

  it("should handle projectsLoaded", () => {
    const nextState: ProjectsState = {
      error: null,
      loading: false,
      count: projectsMock.length,
      projects: projectsMock,
    };

    expect(
      projectsRedcuer(
        undefined,
        projectsLoaded({
          data: projectsMock,
          total: projectsMock.length,
        })
      )
    ).toEqual(nextState);
  });

  it("should handle projectsFailure", () => {
    const nextState: ProjectsState = {
      ...initialState,
      count: 0,
      loading: false,
      projects: [],
      error: "error response",
    };

    expect(
      projectsRedcuer(initialState, projectsFailure("error response"))
    ).toEqual(nextState);
  });
});
