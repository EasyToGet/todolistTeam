const errHandle = require('./errorHandle');

const patchTodo = (req, res, todos) => {
  const headers = {
    'Access-Control-Allow-Headers': 'Content-Type, Authorization, Content-Length, X-Requested-With',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'PATCH, POST, GET,OPTIONS,DELETE',
    'Content-Type': 'application/json'
  };

  let body = "";
  req.on('data', chunk => {
    body += chunk;
  })

  req.on('end', () => {
    try {
      const title = JSON.parse(body).title;
      const id = req.url.split('/').pop();
      const index = todos.findIndex(element => element.id == id);
      if(title !== undefined && index !== -1) {
        todos[index].title = title;
        res.writeHeader(200, headers);
        res.write(JSON.stringify({
          "status": "success",
          "data": todos
        }));
        res.end();
      } else {
        errHandle(res);
      }
    } catch (error) {
      errHandle(res);
    }
  });
};

module.exports = patchTodo;