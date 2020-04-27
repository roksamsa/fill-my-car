const express = require('express');
const router = express.Router();
const fs = require('fs');
const https = require('https');

const options = {
  hostname: 'localhost',
  port: 4433,
  path: '/',
  method: 'GET',
  key: fs.readFileSync('../client1-key.pem'),
  cert: fs.readFileSync('../client1-crt.pem'),
  ca: fs.readFileSync('../ca-crt.pem')
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

