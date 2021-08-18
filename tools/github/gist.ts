import { AxiosInstance } from 'axios';

class Gist {
  constructor(private api: AxiosInstance) {}
  get(id: string) {
    return this.api.get(`/gists/${id}`);
  }
}
