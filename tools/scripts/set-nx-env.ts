import { env, exit } from 'process';
import yargs from 'yargs';

import { setNxEnvUseGist } from '../github/set-nx-env-use-gist';

const {
  GITHUB_ACTIONS,
  CIRCLECI,
  CIRCLE_BRANCH,
  GITHUB_HEAD_REF,
  GITHUB_BASE_REF,
  GITHUB_EVENT_NAME,
  GITHUB_SHA
} = env;

const config = yargs.option('mode', { type: 'string', choices: ['test', 'e2e', 'deploy'], default: 'test' }).argv;

// 在 gitlab CI 中
if (GITHUB_ACTIONS === 'true') {
  setNxEnvUseGist({
    mode: config.mode,
    headRef: GITHUB_HEAD_REF,
    baseRef: GITHUB_BASE_REF,
    isPullRequest: GITHUB_EVENT_NAME === 'pull_request',
    sha: GITHUB_SHA
  }).then(
    () => exit(),
    () => exit(1)
  );
} else if (CIRCLECI === 'true') {
  ///
  // const githubApi = githabAPI.get(
  //   `repos/${CIRCLE_PROJECT_USERNAME}/${CIRCLE_PROJECT_REPONAME}/pulls/${CIRCLE_PR_NUMBER}`
  // );
  setNxEnvUseGist({
    mode: config.mode,
    headRef: CIRCLE_BRANCH,
    baseRef: GITHUB_BASE_REF,
    isPullRequest: GITHUB_EVENT_NAME === 'pull_request',
    sha: GITHUB_SHA
  }).then(
    () => exit(),
    () => exit(1)
  );
}
