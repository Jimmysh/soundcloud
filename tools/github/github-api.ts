import axios from 'axios';
import { env } from 'process';

const { GITHUB_ACCESS_TOKEN, GITHUB_API_URL } = env;

// 设置请求头
let headers = {};
if (GITHUB_ACCESS_TOKEN) {
  headers = {
    Authorization: `Bearer ${GITHUB_ACCESS_TOKEN}`
  };
}

export const githabAPI = axios.create({
  baseURL: GITHUB_API_URL,
  timeout: 1000,
  headers
});


