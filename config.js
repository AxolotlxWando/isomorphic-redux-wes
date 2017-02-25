var rc = require('rc');

module.exports = rc('isomorphic-redux-wes', {
  port: process.env.PORT || 3001,
  devPort: process.env.DEV_PORT || 8001,
  /* For resolving api calls and static assets */
  deploymentURLMapping: process.env.DEPLOYMENT_URL_MAPPING || '/'
});
