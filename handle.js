const library = require('./library');

const successHandle = (res, todos) => {
  res.writeHeader(200, library.headers);
  res.write(JSON.stringify({
    "status": "success",
    "data": todos
  }));
  res.end();
};

const errorHandle = (res) => {
  res.writeHead(400, library.headers);
  res.write(JSON.stringify(
    {
      "status": "false",
      "message": "欄位未填寫正確，或無此 todo ID"
    }
  ));
  res.end();
}

module.exports = { successHandle, errorHandle };