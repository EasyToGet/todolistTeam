const errHandle = require('./errorHandle');
const { v4: uuidv4 } = require('uuid');

const postTodo = (req, res, todos) => {
  const headers = {
    'Access-Control-Allow-Headers': 'Content-Type, Authorization, Content-Length, X-Requested-With',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'PATCH, POST, GET,OPTIONS,DELETE',
    'Content-Type': 'application/json'
  }
  
  let body = "";

  req.on('data', chunk => {
    body += chunk;
  })

  req.on('end', () => {
    try {
      const title = JSON.parse(body).title;
      if(title !== undefined) {
        const todo = {
          "title": title,
          "id": uuidv4()
        };
        todos.push(todo);
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

module.exports = postTodo;