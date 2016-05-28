'use strict';

let http = require('http');
let fs = require('fs');
let path = require('path');

const PORT = process.env.PORT || 8080;

http.createServer((req, res) => {
  res.writeHead(200);
  res.write('yo yo');

fs.readFile(path.join(__dirname, '../../../Desktop'));
console.log();

  res.end();
}).listen(PORT, err => {
  console.log(err || `Server listening on ${PORT}`);
});
