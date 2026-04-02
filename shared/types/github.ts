import type { Endpoints } from "@octokit/types";

export type GitHubStarredResponse = Endpoints["GET /user/starred"]["response"];

export type GithubStarredRepository = GitHubStarredResponse["data"][number];

export interface Repository {
  id: string;
  name: string;
  fullname: string;
  description: string | null;
  url: string;
  homepage: string | null;
  archived: boolean;
  forks: number;
  stars: number;
  language: string | null;
  branch: string | null | undefined;
  git: string;
  license: {
    name: string | null;
    slug: string | null;
    url: string | null;
  } | null;
  createdAt: string | null | undefined;
  updatedAt: string | null | undefined;
  pushedAt: string | null | undefined;
  owner: {
    id: number;
    username: string;
    avatar: string;
    url: string;
  };
}
