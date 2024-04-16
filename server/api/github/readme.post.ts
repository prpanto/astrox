import { useSession } from 'h3'
import { Octokit } from '@octokit/core'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const github = await useSession(event, { password: 'de49f5b9ecea66733c529ee62f2f45bce96072bd66f79d5e98cc1370ebab1471' })
  const octokit = new Octokit({ auth: github.data.token })
  
  const data: any = await octokit.graphql(
    `query ($username: String!, $repo: String!) {
      repository(owner: $username, name: $repo) {
        object(expression: "HEAD:README.md") {
          ... on Blob {
            text        
          }
        }
      }
    }`,
    {
      username: body.username,
      repo: body.repo
    }
  )
  
  return data
})
