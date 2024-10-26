var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('hola mundo, Estefani Jeannielys Gonzalez Gonzalez C.I: 32057736 seccion: 4');
});

module.exports = router;
