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
    
    core.info('fetching the given Pull Request')
    const pullRequest = await ooctokit.rest.pulls.get({
      ...github.context.owner,
      ...github.context.repo,
      pull_number: prKey
    });
    core.info(`pr : ${pullRequest}`)

    if (pullRequest.draft) {
        await toDraft(pullRequest.node_id)
        core.info(
          `pr converted to draft: ${pullRequest.number} ${pullRequest.title}, last activity time ${pullRequest.updated_at}`
        )
      }
    }
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
  }
}

run()
