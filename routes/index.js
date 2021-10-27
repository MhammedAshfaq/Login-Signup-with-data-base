var express = require('express');
var router = express.Router();
const loginHelper = require('../db-helper/user-helper')

/* GET home page. */
router.get('/aboout',(req,res)=>{
  let user = req.session.user;
  console.log(user);
  res.render('about',{user})
});

// Login get action 
router.get('/', function (req, res, next) {
  // if(req.session.loggedIn){
  //   res.render('about');
  // }else
    res.render('index');
});


//Login Post action
router.post('/index', function (req, res, next) {
  loginHelper.doLogin(req.body).then((response) => {
    if (response.status) {
      req.session.loggedIn = true; //session setting
      req.session.user = response.user;
      res.redirect('/aboout')
    } else {
      res.render('invalid');
    }
  })
});

//Logout get action
router.get('/logout',(req,res)=>{
  req.session.destroy();   ///session.distroy() is clearing cookei&sesseion connection
  res.redirect('/aboout')
})

module.exports = router;
