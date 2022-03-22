export interface ProjectsState {
  count: number;
  error: string | null;
  loading: boolean;
  projects: Project[];
}

export interface Project {
  dependent_repos_count: number;
  dependents_count: number;
  deprecation_reason: string | null;
  description: string | null;
  forks: number;
  homepage: string | null;
  keywords: string[];
  language: string;
  name: string;
  licenses: string | null;
  normalized_licenses: string[];
  license_normalized: boolean;
  platform: string;
  rank: number;
  repository_url: string | null;
  repository_license: string | null;
  package_manager_url: string | null;
  stars: number;
  status: string | null;
  versions: ProjectVersion[];
  latest_download_url: string | null;
  latest_release_number: string;
  latest_release_published_at: string;
  latest_stable_release_number: string | null;
  latest_stable_release_published_at: string | null;
}

export interface ProjectVersion {
  number: string;
  published_at: string;
  spdx_expression: string | null;
  original_license: string | null;
  researched_at: string | null;
  repository_sources: string[] | null;
}
