const errHandle = require('./errorHandle');

const headers = {
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, Content-Length, X-Requested-With',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'PATCH, POST, GET,OPTIONS,DELETE',
  'Content-Type': 'application/json'
}

const deleteAllTodo = (res, todos) => {
  todos.length = 0;
  res.writeHeader(200, headers);
  res.write(JSON.stringify({
    "status": "success",
    "data": todos
  }));
  res.end();
};

const deleteSingleTodo = (req, res, todos) => {
  const id = req.url.split('/').pop();
  const index = todos.findIndex(element => element.id == id);
  if(index !== -1) {
    todos.splice(index, 1);
    res.writeHeader(200, headers);
    res.write(JSON.stringify({
      "status": "success",
      "data": todos
    }));
    res.end();
  } else {
    errHandle(res);
  }
};

module.exports = {
  deleteAllTodo,
  deleteSingleTodo
};