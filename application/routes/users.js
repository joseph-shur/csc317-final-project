var express = require('express');
var router = express.Router();
var db = require('../conf/database');
//var bcrypt = require('bcrypt');
var { isLoggedIn, isMyProfile } = require('../middleware/auth');
var { isUsernameUnique, usernameCheck } = require('../middleware/validation');

//Get users listing
router.get('/', async function(req, res, next) {

  try{
    let [rows, fields] = await db.query(`select * from users;`);
    res.status(200).json({rows});
  }catch(error) {
    next(error);
  }
});

router.use('/registration', function(req, res, next) {
});
router.post('/registration',isUsernameUnique, usernameCheck, async function(req, res, next) {
  var {username, email, password} = req.body;
  try{
    //check username
    var [rows, fields] = await db.execute(`select id from users where username?;`, [username]);
    if(rows && rows.length > 0){
      return res.redirect('/registration');
    }
    //check email
    var [rows, fields] = await db.execute(`select id from users where email?;`, [email]);
    if(rows && rows.length > 0){
      return res.redirect('/registration');
    }
    var [resultObject, fields] = db.execute(`INSERT INTO users (username, email, password) value (?,?,?)`,[username, email, password]);

    //respond
    if(resultObject && resultObject.affectedRows === 1){
      res.redirect('/login');
    } else {
      return res.redirect('/registration');
    }
    console.log(resultObject);
    res.end();
  } catch(error) {
    next(error);
  }
  console.log(req.body);
  res.end();

});

//new route/middleware created as of 5/8/23
router.get("profile/:id(\\d+)", isLoggedIn, isMyProfile, function (req, res) {
  res.render("profile");
});

router.post("/logout", isLoggedIn, function (req, res) {

});

module.exports = router;
