var path = require('path');
var archive = require('../helpers/archive-helpers');
var fs = require('fs');
var helpers = require('./http-helpers');
//var util = require('util');
// require more modules/folders here!

var headers = helpers.headers;

exports.handleRequest = function (request, response) {

  if (request.method === 'GET' && request.url === '/') {
    // console.log(request);
    helpers.serveAssets(response, './web/public/index.html'); 

  } else if (request.method === 'GET' && request.url !== '/') {
      //test if request.url is an archived site ... 
        //if it is, we need to serveAssets(assest = archivedsitefile)
      //if not, do 404
    fs.access(archive.paths.archivedSites + request.url, function(err) {
      if (err && err.code === 'ENOENT') {
        response.writeHead(404);
        response.end();
      } else {
        helpers.serveAssets(response, archive.paths.archivedSites + request.url);
      }
    });
  } else if (request.method === 'POST') {
    request.on('data', function(chunk) {
      //var text = (chunk.toString()).slice(4); //(this is the url without url=)
      fs.appendFile(archive.paths.list, (chunk.toString()).slice(4) + '\n', function(err) {
        if (err) { console.error(err); }
      });
      response.writeHead(302);
      response.end();
    });
    
  }
};
