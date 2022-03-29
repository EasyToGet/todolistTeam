const handle = require('./handle');

const getTodo = (res, todos) => {
  handle.successHandle(res, todos);
};

module.exports = getTodo;