import { env } from 'process';

import { githabAPI } from './github-api';

const { GITHUB_GIST_ID } = env;

const getList = async () => {
  // let info
  try {
    const info = await githabAPI.get(`/gists/${GITHUB_GIST_ID}`);
    console.log(info);
  } catch (error) {}
};

getList();
