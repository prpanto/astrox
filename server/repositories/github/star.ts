import { Octokit } from "@octokit/core";
import type { GitHubStarredResponse, Repository } from "~~/shared/types/github";
import useDatabase from "~~/server/utils/database";

export default class StarRepository {
  private octokit: Octokit | null = null;

  token(token: string) {
    this.octokit = new Octokit({
      auth: token,
    });

    return this;
  }

  async fetch(): Promise<Repository[]> {
    if (!this.octokit) {
      throw new Error("Octokit is not initialized. Set token first.");
    }

    const repositories: Repository[] = [];
    let page = 1;
    let hasNextPage = true;

    while (hasNextPage) {
      try {
        const response = await this.octokit.request("GET /user/starred", {
          per_page: 100,
          page: page,
          headers: {
            "X-GitHub-Api-Version": "2022-11-28",
          },
        }) as GitHubStarredResponse;

        const data = response.data;

        if (data.length === 0) {
          hasNextPage = false;
          break;
        }

        const repos: Repository[] = data.map((repo) => ({
          id: repo.node_id,
          name: repo.name,
          fullname: repo.full_name,
          description: repo.description,
          url: repo.html_url,
          homepage: repo.homepage,
          archived: repo.archived,
          forks: repo.forks_count,
          stars: repo.stargazers_count,
          language: repo.language,
          branch: repo.default_branch,
          git: repo.git_url,
          license: repo.license
            ? {
              name: repo.license.name,
              slug: repo.license.spdx_id,
              url: repo.license.url,
            }
            : null,
          createdAt: repo.created_at,
          updatedAt: repo.updated_at,
          pushedAt: repo.pushed_at,
          owner: {
            id: repo.owner.id,
            username: repo.owner.login,
            avatar: repo.owner.avatar_url,
            url: repo.owner.html_url,
          },
        }));

        repositories.push(...repos);

        if (data.length < 100) {
          hasNextPage = false;
        } else {
          page++;
        }
      } catch (error: any) {
        throw createError({
          statusCode: 500,
          statusMessage: "Failed to fetch stars.",
        });
      }
    }

    return repositories;
  }

  async store() {
    const stars = await this.fetch();
    const database = useDatabase();
  }
}
