var path = require('path');
var archive = require('../helpers/archive-helpers');
var fs = require('fs');
var helpers = require('./http-helpers');
//var util = require('util');
// require more modules/folders here!

var headers = helpers.headers;

exports.handleRequest = function (request, response) {
  
  var parts;

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
    console.log(request);
  }
};
