var express = require('express');
var db = require('../config/connection');

var router = express.Router();


/// route to get items from client and add to cart//
router.post('/api/cart', function(req, res) {
  db.query('INSERT INTO cart SET ?;', req.body, function(err, results) {
    if (err) throw err;
    console.log(req.body);
    db.query('SELECT * FROM cart', function(err, results) {
      if (err) throw err;
      res.json(results);
    });
  });
});




// router.get('/api/cart', function(req,res){
//   db.query('SELECT * FROM cart')
// })


module.exports = router;