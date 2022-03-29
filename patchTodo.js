const handle = require('./handle');

const patchTodo = (req, res, todos) => {
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
        handle.successHandle(res, todos);
      } else {
        handle.errorHandle(res);
      }
    } catch (error) {
      handle.errorHandle(res);
    }
  });
};

module.exports = patchTodo;