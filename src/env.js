let envs = {
  production: {
    apiUrl: 'https://',
    GA: {
      code: 'ga-code-prod'
    },
    debug: false
  },
  staging: {
    apiUrl: 'https://',
    GA: {
      code: 'ga-code-staging'
    },
    debug: true
  },
  development: {
    apiUrl: 'http://localhost:8081',
    GA: {
      code: 'ga-code-dev'
    },
    debug: true
  }
};

export default envs[process.env.REACT_APP_HOST_ENV || process.env.NODE_ENV];
