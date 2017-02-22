var rc = require('rc');

module.exports = rc('isomorphic-redux-wes', {
  port: process.env.PORT || 3001,
  devPort: process.env.DEV_PORT || 8001
});
