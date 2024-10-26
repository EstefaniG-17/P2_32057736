var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('hola mundo, Cristhian Alfonzo Angyalbert Padron C.I: 31.031.669 seccion: 4');
});

module.exports = router;
