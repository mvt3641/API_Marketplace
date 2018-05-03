var express = require('express');
var db = require('../config/connection');

var router = express.Router();


/// route to get items from client and add to cart//
router.post('/api/cart', function(req, res) {

  ////loop through mysql cart table for item/////
  // db.query('SELECT * FROM cart', function(err, results) {
  //     for (var i = 0; i < results.length; i++) {
  // //
  // //
  //         console.log(results[i]);
  // //       ////if results equal item selected update quanitiy/////
  //     //   if (results[i].ProductName === req.body) {
  //     //     db.query('UPDATE cart SET ? WHERE ?',
  //     //     [{
  //     //         Quantity: req.body.Quantity++
  //     //       },
  //     //       {
  //     //         ProductName: req.body.ProductName
  //     //       }
  //     //     ],
  //     //     function(err){
  //     //       if (err) throw err;
  //     //     }
  //     //     );
  //     // } else {
  //     //   // console.log(results[i]);
          db.query('INSERT INTO cart SET ?;', req.body, function(err, results) {
            if (err) throw err;
            console.log(req.body);
      //     })
      //   };
    })
    // }
    // });
})

    // db.query('INSERT INTO cart SET ?;', req.body, function(err, results) {
    //   if (err) throw err;
    //   console.log(req.body);
    // db.query('SELECT * FROM cart', function(err, results) {
    //   if (err) throw err;
    //   res.json(results);
    // });
  // });
// });





// router.get('/api/cart', function(req,res){
//   db.query('SELECT * FROM cart')
// })


module.exports = router;
