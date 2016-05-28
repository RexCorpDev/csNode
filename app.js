'use strict';

let http = require('http');
const PORT = process.env.PORT || 8080;

http.createServer((req, res) => {
  res.writeHead(200);
  res.write('yo yo');
  res.end();
}).listen(PORT, err => {
  console.log(err || `Server listening on ${PORT}`);
});
