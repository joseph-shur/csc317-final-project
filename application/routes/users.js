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

router.get('/registration', function(req, res, next) {

});

router.post('/registration', async function(req, res, next) {
  var {username, email, password} = req.body;
  try{
    //check username
    var [rows, fields] = await db.execute(`select id from users where username=?;`, [username]);
    if(rows && rows.length > 0){
      return res.redirect('/registration');
    }
    //check email
    var [rows, fields] = await db.execute(`select id from users where email=?;`, [email]);
    if(rows && rows.length > 0){
      return res.redirect('/registration');
    }
    //insert
    var [resultObject, fields] = db.execute(`INSERT INTO users
    (username, email, password)
    value 
    (?,?,?);`, [username, email, password]);

    //respond
    if(resultObject && resultObject.affectedRows == 1){
      res.redirect('/login');
    } else {
      return res.redirect('/registration');
    }
  } catch(error) {
    next(error);
  }

});

//new route/middleware created as of 5/8/23
router.get("profile/:id(\\d+)", isLoggedIn, isMyProfile, function (req, res) {
  res.render("profile");
});

router.post("/logout", isLoggedIn, function (req, res) {

});

module.exports = router;
