import { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";

export interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

export interface SearchProps {
  initialValue: string;
  onChange: (value: string) => void;
}

export interface BaseProps {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window;
  children?: React.ReactElement | null;
}

export interface updateSearchQuery {
  ({
    page,
    text,
    sort,
  }: {
    page?: number;
    text?: string;
    sort?: SortType;
  }): void;
}

export type SortType =
  | "stars"
  | "rank"
  | "dependents_count"
  | "dependent_repos_count"
  | "latest_release_published_at"
  | "contributions_count"
  | "created_at";
