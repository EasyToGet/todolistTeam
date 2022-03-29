const handle = require('./handle');

const deleteAllTodo = (res, todos) => {
  todos.length = 0;
  handle.successHandle(res, todos);
};

const deleteSingleTodo = (req, res, todos) => {
  const id = req.url.split('/').pop();
  const index = todos.findIndex(element => element.id == id);
  if(index !== -1) {
    todos.splice(index, 1);
    handle.successHandle(res, todos);
  } else {
    handle.errorHandle(res);
  }
};

module.exports = {
  deleteAllTodo,
  deleteSingleTodo
};