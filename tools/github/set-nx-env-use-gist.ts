import { execSync } from 'child_process';
import { env } from 'process';

import { githabAPI } from './github-api';

const { GITHUB_GIST_ID } = env;

if (!GITHUB_GIST_ID) {
  throw new Error('请在环境变量中设置 GITHUB_GIST_ID');
}

interface Gist {
  files: {
    [name: string]: {
      filename: string;
      type: string;
      language: string;
      content: string;
    };
  };
}

interface BranchSHA {
  test?: string; // 已跑完单元测试
  e2e?: string; // 已跑完 e2e
  deploy?: string; // 已上线
}

interface BranchEnv {
  [name: string]: BranchSHA;
}

function getGistConfig(): Promise<BranchEnv> {
  return githabAPI.get<Gist>(`/gists/${GITHUB_GIST_ID}`).then(d => {
    const back: BranchEnv = {};
    for (const key in d.data.files) {
      if (Object.prototype.hasOwnProperty.call(d.data.files, key)) {
        const element = d.data.files[key];
        let content: BranchSHA;
        try {
          content = JSON.parse(element.content);
          if (content) {
            back[key] = content;
          }
        } catch (error) {}
      }
    }
    return back;
  });
}

interface Config {
  mode: string;
  baseRef: string;
  headRef: string;
  isPullRequest?: boolean;
  baseSha?: string;
}
export const setNxEnvUseGist = async (config: Config) => {
  const { mode, baseRef, headRef, isPullRequest } = config;
  const gistConfig = await getGistConfig();
  let headConfig = gistConfig[baseRef];
  let baseConfig = gistConfig[headRef];
  if (!baseConfig) {
    baseConfig = {};
  }
  if (isPullRequest && !headConfig) {
    headConfig = { ...baseConfig };
  }

  const _mode: keyof BranchSHA = mode as any;
  let sha = headConfig[_mode] || baseConfig[_mode] || config.baseSha;

  if (!sha) {
    sha = execSync('git rev-parse HEAD~1').toString();
  }

  const AFFECTED_ARGS = `--base ${sha}`;
  return { AFFECTED_ARGS };
};

// yarn run:tools tools/github/set-env.ts
// githubSetEnv('test').then();
