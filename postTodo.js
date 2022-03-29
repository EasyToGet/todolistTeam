const library = require('./library');
const handle = require('./handle');

const postTodo = (req, res, todos) => {
  let body = "";
  req.on('data', chunk => {
    body += chunk;
  });

  req.on('end', () => {
    try {
      const title = JSON.parse(body).title;
      if(title !== undefined) {
        const todo = {
          "title": title,
          "id": library.uuidv4()
        };
        todos.push(todo);
        handle.successHandle(res, todos);
      } else {
        handle.errorHandle(res)
      }
    } catch (error) {
      handle.errorHandle(res);
    }
  });
};

module.exports = postTodo;