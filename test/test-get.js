var assert = require('assert');
var router = require('../choreographer').router();

// stub out req and res
var req = {
  method: 'GET',
  url: 'http://example.com/'
};
var res = {
  routed: false
};

router.get('/', function(req, res) {
  res.routed = true;
});

router(req, res);

process.on('exit', function() {
  assert(res.routed, 'req and res should be routed');
});
