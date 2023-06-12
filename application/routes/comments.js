var express = require('express');
var router = express.Router();
var {isLoggedIn} = require('../middleware/auth');
var db = require('../conf/database');

router.post('/create', isLoggedIn, async function(req, res, next) {
    var { userid, username } = req.session.user;
    var { postid, comment} = req.body;

    try {
        var [insertResult, _] = await db.execute( `INSERT INTO comments (text,fk_postid,fk_authorid) VALUE (?,?,?)`, [comment, postid, userid]);

        if(insertResult && insertResult == 1) {
            return res.status(201).json({
                insertResult: insertId,
                username: username,
                commentText: comment
            });
        }
    } catch(error) {
        next(error);
    }
});

module.exports = router;