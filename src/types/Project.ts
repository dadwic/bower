export interface Project {
  dependent_repos_count: number;
  dependents_count: number;
  description: string | null;
  forks: number;
  homepage: string | null;
  keywords: string[];
  language: string;
  latest_download_url: string;
  latest_release_number: string;
  latest_release_published_at: string;
  latest_stable_release: ProjectRelease;
  name: string;
  normalized_licenses: string[];
  package_manager_url: string;
  platform: string;
  rank: number;
  repository_url: string | null;
  stars: number;
  status: string | null;
  versions: ProjectVersion[];
}

export interface ProjectRelease {
  created_at: string;
  id: number;
  number: string;
  project_id: number;
  published_at: string;
  runtime_dependencies_count: number | null;
  updated_at: string;
}

export interface ProjectVersion {
  number: string;
  published_at: string;
}
