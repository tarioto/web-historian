var fs = require('fs');
var path = require('path');
var _ = require('underscore');

/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.paths = {
  siteAssets: path.join(__dirname, '../web/public'),
  archivedSites: path.join(__dirname, '../archives/sites'),
  list: path.join(__dirname, '../archives/sites.txt')
};

// Used for stubbing paths for tests, do not modify
exports.initialize = function(pathsObj) {
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

exports.readListOfUrls = function(cb) {
  fs.readFile(exports.paths.list, 'utf-8', function(err, data) {
    if (err) { console.error(err); }
    cb(data.split('\n'));
  });
};

exports.isUrlInList = function(url, cb) {
  exports.readListOfUrls(function(data) {
    var found = false;
    data.forEach(function(item) {
      if (item === url) {
        console.log(item);
        found = true;
        cb(found);
      }
    });
    if (found === false) {
      cb(found);
    }
  });
};

exports.addUrlToList = function(url, cb) {
  fs.appendFile(exports.paths.list, url + '\n', function(err) {
    if (err) { console.error(err); }
    console.log('appended');
    cb();
  });
};

exports.isUrlArchived = function(url, cb) {
  fs.access(exports.paths.archivedSites + '/' + url, function(err) {
    var found = false;
    if (err) { 
      // console.error(err); 
    } else {
      found = true;
    }
    cb(found);
  });
};

exports.downloadUrls = function(urlArray) {
  urlArray.forEach(function(url) {
    fs.open(exports.paths.archivedSites + '/' + url, 'w', function (err, fd) {
      if (err) { console.error(err); }
      fs.close(fd);
    });
  });
};
