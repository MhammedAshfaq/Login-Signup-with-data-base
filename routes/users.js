var express = require('express');
var router = express.Router();
const userHelper = require('../db-helper/user-helper');


/* GET users listing. */
router.get('/', function (req, res, next) {
  res.render('signup');
});

/*Signup Post Action*/

router.post('/', (req, res) => {
  userHelper.doSignup(req.body).then((response) => {
    console.log(response);
    res.render('about')
  })
})

module.exports = router;
