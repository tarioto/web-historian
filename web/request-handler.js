var path = require('path');
var archive = require('../helpers/archive-helpers');
var fs = require('fs');
var helpers = require('./http-helpers');
var urlParse = require('url');
//var util = require('util');
// require more modules/folders here!

var headers = helpers.headers;

exports.handleRequest = function (request, response) {
  
  var parts = urlParse.parts(request.url);
  console.log(parts);

  if (request.method === 'GET' && request.url === '/') {
    // console.log(request);
    helpers.serveAssets(response, './web/public/index.html'); 

    // fs.readFile('./web/public/index.html', (err, data) => {
    //   if (err) { console.error(err); } 
    //   response.writeHead(200, {'Content-Type': 'text/html'});
    //   response.write(data.toString());
    //   response.end(archive.paths.list);
    //  });

    //helpers.serveAssets(response, /archive.html)

  } else if (request.method === 'GET' && request.url !== '/') {
    //if filed does not exist {
    // if (fs.stat(process.cwd() + '/archives/sites' + request.url, (err, stats) => {
    //   if (err) { 
    //     console.error(err);
    //   }
    //   if (stats.isFile()) {
    //     console.log(stats);
    //   }  
    // })) {
    //   response.writeHead(404, {'Content-Type': 'text/html'});
    //   response.end();
    // } else {
    //   helpers.serveAssets(response, '/archives/sites/' + request.url);
    // }
    helpers.serveAssets(response, '/archives/sites/' + request.url);
  }
};
