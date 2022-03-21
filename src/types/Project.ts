export interface Project {
  homepage: string | null;
  keywords: string[];
  language: string;
  name: string;
  dependent_repos_count: number;
  dependents_count: number;
  description: string | null;
  forks: number;
  normalized_licenses: string[];
  package_manager_url: string;
  platform: string;
  rank: number;
  stars: number;
  status: string | null;
  versions: any;
  latest_stable_release: any;
  latest_download_url: string;
  latest_release_number: string;
  latest_release_published_at: string;
  repository_url: string | null;
}
