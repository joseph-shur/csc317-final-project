var express = require('express');
var router = express.Router();

router.use(function(req, res, next) {
  req.userIsLoggedIn = true;
  next();
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'CSC 317 App', name:"Joseph Shur",
    results: [{},{},{},{},{},{},{},{},{}], js: ["index.js"]});
});

router.get("/login", function(req, res) {
  res.render('login');
});

router.use('/postvideo', function(req, res, next) {
  //where to pull up API token and validate user/key
  if(req.userIsLoggedIn = false){
    next();
  } else {
    res.redirect('/users/login');
  }
});

router.get("/postvideo", function(req, res) {
  res.render('index');
});

router.get("/profile", function(req, res) {
  res.render('profile');
});

router.get("/registration", function(req, res) {
  res.render('registration', { title: 'Register', js: ["registration.js"]});
});

router.get("/viewpost/:id(\\d+)", function(req, res) {
  res.render('viewpost', { title: `View Post ${req.params.id}`, js: ["viewpost.js"]});
});

module.exports = router;
