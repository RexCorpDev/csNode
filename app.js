'use strict';

let http = require('http');
let fs = require('fs');
let path = require('path');
let server = http.createServer();;

const PORT = process.env.PORT || 8080;

server.on('request', (req, res) => {
  res.writeHead(200);
  let newFile = fs.createWriteStream('readme_copy.md');
  req.pipe(newFile);
  console.log('newFile\n', newFile);
  req.on('end', () =>{
    res.end('uploaded!');
  });
}).listen(PORT, err => {
  console.log(err || `Server listening on ${PORT}`);
});













// server.on('request', (req, res) => {
//   res.writeHead(200);
//   res.write('GTG\n');
//   res.end();
// }).listen(PORT, err => {
//   console.log(err || `Server listening on ${PORT}`);
// });

// req.on('readable', ()=>{
//   let chunk = null;
//   while(null !== (chunk = req.read())){
//     res.write(chunk);
//   };
