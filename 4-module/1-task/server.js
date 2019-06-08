const url = require('url');
const http = require('http');
const path = require('path');
const fs = require('fs');

const server = new http.Server();

server.on('request', (req, res) => {
  const pathname = url.parse(req.url).pathname.slice(1);
  const filepath = path.join(__dirname, 'files', pathname);
  const regex = /.+\/.+/g;

  switch (req.method) {
    case 'GET':
      if (pathname.match(regex) != null) {
        res.statusCode = 400;
        res.end('dont have permissions');
      } else {
        const streamRead = fs.createReadStream(filepath);
        streamRead.on('error', (error)=>{
          res.statusCode = 404;
          res.end(error.message);
        });
        streamRead.on('data', (data)=>{
          res.end(data);
        });
      }
      break;

    default:
      res.statusCode = 501;
      res.end('Not implemented');
  }
});

module.exports = server;
