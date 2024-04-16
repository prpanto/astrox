import { useSession } from 'h3'
import { Octokit } from '@octokit/core'
import { createStorage } from 'unstorage'
import redisDriver from 'unstorage/drivers/redis'

export default defineEventHandler(async (event) => {
  const github = await useSession(event, { password: 'de49f5b9ecea66733c529ee62f2f45bce96072bd66f79d5e98cc1370ebab1471' })
  const octokit = new Octokit({ auth: github.data.token })
  const query = getQuery(event)
  // const refetch = query.refetch ??= false
  const refetch = (query.refetch as boolean) ||= false
  
  const storage = createStorage({
    driver: redisDriver({
      base: 'unstorage',
      host: process.env.REDIS_HOST,
      port: process.env.REDIS_PORT,
    })
  })
  
  const stars: object[] = []
  let cursor: string | null = null
  const hasStars = await storage.hasItem('stars')
  const cacheStars: object[] = await storage.getItem('stars') || []
  let i = 1

  if ((!hasStars && !cacheStars.length)) { // || refetch
    while (true) {
      const graphql = 
      `{
        viewer {
          starredRepositories(
            first: 100,
            ${cursor ? `after: "${cursor}",` : ''}
            orderBy: {field: STARRED_AT, direction: DESC}
          ) {
            totalCount
            edges {
              node {
                id
                nameWithOwner
                description
                url
                homepageUrl
                isArchived
                forkCount
                stargazers {
                  totalCount
                }
                latestRelease {
                  updatedAt
                }
                primaryLanguage {
                  name
                  color
                }
                defaultBranchRef {
                  name
                }
              }
            }
            pageInfo {
              endCursor
              hasNextPage
            }
          }
        }
      }`
  
      const data: any = await octokit.graphql(graphql)
      stars.push(...data.viewer.starredRepositories.edges.map((edge: any) => edge.node))
      cursor = data.viewer.starredRepositories.pageInfo.endCursor
      console.log('Stars loading... ' + i++)

      if (!data.viewer.starredRepositories.pageInfo.hasNextPage) break
    }
  }
  
  if (!cacheStars.length) storage.setItem('stars', stars)

  return cacheStars
})
