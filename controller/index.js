const express = require('express');
const router = express.Router();
const https = require('https');

const options = {
  hostname: 'localhost',
  port: 443,
  path: '/',
  method: 'GET'
};

const req = https.request(options, function(res) {
  res.on('data', function(data) {
    process.stdout.write(data);
  });
});

req.end();

router.get('/', function (req, res) {
  res.json({
    "Message": "'Fill my car' application works!"
  });
});

module.exports = router;
