var assert = require('assert');
var router = require('../choreographer').router();

var response = {};

// stub out req and res
var req = {
  method: 'GET',
  url: 'http://example.com/'
};
var res = {
  end: function(body) {
    response.body = body;
  },
  writeHead: function(statusCode, headers) {
    response.statusCode = statusCode;
    response.headers = headers;
  }
};

router(req, res);

process.on('exit', function() {
  assert.equal(response.statusCode, 404, 'statusCode should be 404');
  assert.equal(response.body, 
    '<html><head><title>Error 404: Not Found</title></head><body>\n<h1>Error 404: Not Found</h1>\n<p>Cannot GET http://example.com/</body></html>\n', 
    'response body should be default 404 text');
});
