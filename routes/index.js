import express from 'express';
const router = express.Router();

router.get('/', function (req, res) {
  res.json({
    "Message": "Fill my car application works!"
  });
});

module.exports = router;
