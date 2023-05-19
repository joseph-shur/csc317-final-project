var express = require('express');
var router = express.Router();
var db = require('../conf/database');
var bcrypt = require('bcrypt');
var { isLoggedIn, isMyProfile } = require('../middleware/auth');
var { isUsernameUnique, usernameCheck } = require('../middleware/validation');

//Get users listing
router.get('/', isUsernameUnique, isMyProfile, async function(req, res, next) {

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

    var hashedPassword = await bcrypt.hash(password, 3);

    //insert
    var [resultObject, fields] = await db.execute(`INSERT INTO users
    (username, email, password)
    VALUE 
    (?,?,?);`, [username, email, hashedPassword]);

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

router.post('/login', async function(req, res, next) {
  const {username, password} = req.body;

  if (!username || !password) {
    return res.redirect("/login");
  } else {
    var [rows, fields] = await db.execute(`select id, username,password,email from users where username=?;`, [username]);
    var user = rows[0];
    if (!user) {
      req.flash("error", `Log in Failed: Invalid username/password.`);
      req.session.save(function(err) {
        return res.redirect("/login");
      });
    } else {
      var passwordsMatch = await bcrypt.compare(password, user.password);
      if (passwordsMatch) {
        req.session.user = {
          userid: user.id,
          email: user.email,
          username: user.username
        }
        req.flash("success", `You are now logged in`);

        req.session.save(function(err) {
          return res.redirect("/");
        });
      } else {
        return res.redirect("/login");
      }
    }
  }
});

router.use(function(req, res, next) {
  if(req.session.user) {
    next();
  } else {
    return res.redirect("/login");
  }
});

router.get("profile/:id(\\d+)", isLoggedIn, isMyProfile, function (req, res) {
  
  res.render("profile");
});

module.exports = router;
