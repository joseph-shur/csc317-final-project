var express = require('express');
const {isLoggedIn} = require("../middleware/auth");
const {getRecentPosts, getPostsForUserById} = require("../middleware/posts");
var router = express.Router();

router.use(function(req, res, next) {
  req.userIsLoggedIn = true;
  next();
  if (isLoggedIn === true) {

  }
});

/* GET home page. */
router.get('/', getRecentPosts,function(req, res, next) {
  res.render('index',{ title: 'CSC 317 App', name:"Joseph Shur", js: ["index.js"]});
});

router.get("/login", function(req, res) {
  res.render('login', {user: `${req.session.user}`});
});

router.get("/postvideo", isLoggedIn, function(req, res) {
  res.render('postvideo');
});

router.get("/profile/:id(\\d+)", getPostsForUserById, function(req, res) {
  res.render('profile', { title: `Profile`, js: `profile.js`, userid: `${req.session.user.userid}`});
});

router.get("/registration", function(req, res) {
  res.render('registration', { title: 'Register', js: ["registration.js"]});
});

router.get("/logout", isLoggedIn, function (req, res, next) {
  req.session.destroy(function(err) {
    if(err){
      next(err);
    }
    // req.flash("success", `You are now logged out`);
    return res.redirect("/");
  })
});

module.exports = router;
