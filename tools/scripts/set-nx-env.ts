import { config } from 'dotenv';
import { env, exit } from 'process';
import * as yargs from 'yargs';

import { githabAPI } from '../github/github-api';
import { setNxEnvUseGist } from '../github/set-nx-env-use-gist';

// config({ path: '.github.env' });
config({ path: '.circleci.env' });

const {
  GITHUB_ACTIONS,
  CIRCLECI,
  CIRCLE_BRANCH,
  GITHUB_HEAD_REF,
  GITHUB_BASE_REF,
  GITHUB_EVENT_NAME,
  GITHUB_SHA,
  CIRCLE_PULL_REQUEST,
  CIRCLE_PROJECT_USERNAME
} = env;

const argv = yargs.option('mode', { type: 'string', choices: ['test', 'e2e', 'deploy'], default: 'test' }).argv;

const setNxEnv = async () => {
  // 在 gitlab CI 中
  if (GITHUB_ACTIONS === 'true') {
    setNxEnvUseGist({
      mode: argv.mode,
      headRef: GITHUB_HEAD_REF,
      baseRef: GITHUB_BASE_REF,
      isPullRequest: GITHUB_EVENT_NAME === 'pull_request',
      baseSha: GITHUB_SHA
    }).then(
      () => exit(),
      () => exit(1)
    );
  } else if (CIRCLECI === 'true') {
    const isPullRequest = !!CIRCLE_PULL_REQUEST;
    let baseRef: string;
    let baseSha: string;
    if (isPullRequest) {
      const apiURL = CIRCLE_PULL_REQUEST.replace(CIRCLE_PROJECT_USERNAME, `repos/${CIRCLE_PROJECT_USERNAME}`)
        .replace('https://github.com', '')
        .replace('pull', 'pulls');
      const githubApi = await githabAPI.get(apiURL);
      baseRef = githubApi.data.base.ref;
      baseSha = githubApi.data.base.sha;
    }
    const headRef = CIRCLE_BRANCH;
    setNxEnvUseGist({
      mode: argv.mode,
      headRef,
      baseRef,
      isPullRequest,
      baseSha
    }).then(
      () => exit(),
      () => exit(1)
    );
  }
};

setNxEnv();

// yarn run:tools tools/scripts/set-nx-env.ts
