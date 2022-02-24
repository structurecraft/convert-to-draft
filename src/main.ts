import * as core from '@actions/core'
import * as github from '@actions/github'

const octokit = github.getOctokit(core.getInput('repo-token'))

async function toDraft(id: string): Promise<void> {
  await octokit.graphql(
    `
    mutation($id: ID!) {
      convertPullRequestToDraft(input: {pullRequestId: $id}) {
        pullRequest {
          id
          number
        }
      }
    }
    `,
    {
      id
    }
  )
}

async function run(): Promise<void> {
  try {
    const prKey = (
      core.getInput('pr-key', {required: true})
    )
    core.info('fetching all open pull requests until I figure out how to get by ID')
    const pullRequests = await octokit.paginate(octokit.rest.pulls.list, {
      ...github.context.repo,
      state: 'open',
      per_page: 100
    })
    core.info(`pr key: ${pullRequests.length}`)

    for (const pr of pullRequests) {
      if (!pr.draft && pr.key != prKey)) {
        await toDraft(pr.node_id)
        core.info(
          `pr converted to draft: ${pr.number} ${pr.title}, last activity time ${pr.updated_at}`
        )
      }
    }
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
  }
}

run()
