import axios from 'axios';

import env from '../env';

const Api = axios.create({
  baseURL: env.apiUrl,
  headers: {
    'Accept': 'application/json'
  }
});

export default Api;