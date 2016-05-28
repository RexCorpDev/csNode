'use strict';

let http = require('http');
let fs = require('fs');
let path = require('path');
let server = http.createServer();;

const PORT = process.env.PORT || 8080;

// server.on('request', (req, res) => {
//   res.writeHead(200);
//   res.write('GTG\n');
//   res.end();
// }).listen(PORT, err => {
//   console.log(err || `Server listening on ${PORT}`);
// });

server.on('request', (req, res) => {
  res.writeHead(200);
  req.pipe(res);
});
req.on('end', ()=>{
  res.end();
}).listen(PORT, err => {
  console.log(err || `Server listening on ${PORT}`);
});
