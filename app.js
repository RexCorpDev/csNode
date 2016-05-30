'use strict';

const PORT = process.env.PORT || 8080;
let express = require('express');
let app = express();
let server = require('http').createServer(app);
let io = require('socket.io')(server);
let redis = require('redis');
let redisClient = redis.createClient();
let messages = [];

let storeMessage = (name, message) => {
  let message = JSON.stringify({name, data});
  redisClient.lpush('messages', message, (err, res) => {
    redisClient.ltrim('messages', 0, 9);
  });
  // if(messages.length > 10) return messages.shift();
};

io.on('connection', client => {
  client.on('join', name => {
    redisClient.lrange('message', 0, -1, (err, messages)=> {
      messages = messages.reverse();


      messages.forEach(m => {
        m = JSON.parse(m);
        client.emit('messages', m.name + ":" + m.data;)
      });
    });
  });

  client.on('messages', message => {
    client.get('nickname', (err, name) =>{
      client.broadcast.emit('messages', name + ": " + message);
      client.emit('message', name + ": " + message);
      storeMessage(name, message);
    });
  });
  // client.on('question', question => {
  //   if(!client.question_asked){
  //     client.question_asked = true;
  //     return client.broadcast.emit('question', question);
  //   };
  // });
});

server.listen(PORT, err => {
  console.log(err || `Server @ ${PORT}`);
});

// NODE read & write practice
// 'use strict';
//
// let http = require('http');
// let fs = require('fs');
// let path = require('path');
// let server = http.createServer();;
//
// const PORT = process.env.PORT || 8080;
//
// server.on('request', (req, res) => {
//   res.writeHead(200);
//   let newFile = fs.createWriteStream('readme_copy.md');
//   let fileBytes = req.headers['content-length'];
//   let uploadBytes = 0;
//   let chunk = null;
//   while(null !== (chunk = req.read())){
//     uploadBytes += chunk.length;
//     let progress = (uploadBytes / fileBytes) * 100;
//     res.write('progress: ' + parseInt(progress, 10) + '%\n');
//   };
//
//   req.pipe(newFile);
//   req.on('end', () =>{
//     res.end('uploaded!');
//   });
// }).listen(PORT, err => {
//   console.log(err || `Server listening on ${PORT}`);
// });

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
