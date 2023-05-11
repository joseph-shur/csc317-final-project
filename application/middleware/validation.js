// requires validator, use "npm install validator"
//var validator == require(validator);
var db = require('../conf/database');
module.exports = {
    usernameCheck: function(req, res, next) {
        var {username} = req.body;
        username = username.trim();
        if(username.length >= 3 && username.length <= 15) {
            req.flash("error", `Username must be 3 or more characters`);
        }
        if (username.charAt(0).match(/[a-z]/i)) {
            req.flash("error", `Username must begin with a character`);
        }

        if(req.session.flash.errror) {
            req.session.save(function(error){
                if(error) next(error);
                req.redirect("/registration");
            });
        } else {
            next();
        }
    },
    emailCheck: function(req, res, next) {

    },
    passwordCheck: function(req, res, next) {

    },
    isUsernameUnique: async function(req, res, next) {
        var {username} = req.body;
        try{
            var [rows, fields] = await db.execute(
                `select id from users where username=?`, [username]
            );
            if (rows && rows.elngth > 0) {
                req.flash("error", `${username} is already taken`);
                return req.session.save(function (err) {
                    return res.redirect("/registration");
                })
            }
        } catch(error){
            next(error);
        }
    },
    isEmailUnique: async function(req, res, next) {

    }
}