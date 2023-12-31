var pathToFFMPEG = require('ffmpeg-static');
var exec = require('child_process').exec;
const db = require('../conf/database');

module.exports = {
    makeThumbnail: function (req, res, next) {
        if (!req.file) {
            next(new Error("File upload failed"));
        } else {
            try {
                var destinationOfThumbnail = `public/images/uploads/thumbnail-${
                    req.file.filename.split(".")[0]
                }.png`;
                var thumbnailCommand = `${pathToFFMPEG} -ss 00:00:01 -i ${req.file.path} -y -s 200x200 -vframes 1 -f image2 ${destinationOfThumbnail}`;
                exec(thumbnailCommand);
                req.file.thumbnail = destinationOfThumbnail;
                next();
            } catch (error) {
                next(error);
            }
        }
    },
    getPostsForUserById: async function(req, res, next) {
        try {
            let [rows] = await db.execute(`SELECT id,title,thumbnail FROM csc317db.posts WHERE fk_userid=${req.session.user.userid};`);
            res.locals.posts = rows;
            next();
        } catch(error) {
            next(error);
        }
    },
    getPostById: async function(req, res, next) {
        var {id} = req.params;

        try {
            let [rows, _] = await db.execute(`SELECT u.username, p.video, p.title, p.description, p.id, p.createdAt
            from posts p
            JOIN users u
            ON p.fk_userid=u.id
            WHERE p.id=?`, [id]);

            const post = rows[0];
            if(!post) {
                return res.status(404).json({ error: `Post not found`});
            } else {
                res.locals.currentPost = post;
                next();
            }

        } catch (error) {
            next(error);
        }
    },
    getCommentsForPostById: async function(req, res, next) {
        var {id} = req.params;

        try {
            let [rows, _] = await db.execute(`SELECT u.username, c.text, c.createdAt
            from comments c
            JOIN users u
            ON c.fk_authorid=u.id
            WHERE c.fk_postid=?`, [id]);

            res.locals.currentPost.comments = rows;
            next();

        } catch (error) {
            next(error);
        }
    },
    getRecentPosts: async function(req, res, next) {
        try {
            var [rows, _] = await db.execute(`SELECT id,title,thumbnail FROM csc317db.posts ORDER BY createdAt DESC LIMIT 8;`);
            res.locals.posts = rows;
            return res.render('index');
            next();
        } catch(error) {
            next(error);
        }
    }

};