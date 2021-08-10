import { env } from 'process';

import { githabAPI } from './github-api';

const { GITHUB_GIST_ID } = env;

githabAPI.get(`/gists/${GITHUB_GIST_ID}`);
