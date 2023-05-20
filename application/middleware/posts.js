var pathToFFMPEG = require('ffmpeg-static');
var exec = require('child_process').exec;

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
    getPostsForUserBy: async function(req, res, next) {
        try {
            let [rows] = await db.execute(`SELECT * FROM csc317db.posts WHERE fk_userid=${req.session.user.userid};`);
            const posts = rows;
            res.locals.postsForUser = posts;
        } catch(error) {
            next(error);
        }
    },
    getPostById: function(req, res, next) {
        res.locals.currentPost = rows[0];

    },
    getCommentsForPostById: function(req, res, next) {
        res.locals.currentPost.comments = rows;

    },
    getRecentPosts: async function(req, res, next) {
        try {
            let [rows] = await db.execute(`SELECT * FROM csc317db.posts ORDER BY createdAt DESC LIMIT 8;`);
            const posts = rows;
            res.locals.recentPosts = posts;
            next();
        } catch(error) {
            next(error);
        }
    }

};