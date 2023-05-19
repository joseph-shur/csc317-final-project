module.exports = {
    isLoggedIn: function(req, res, next) {
        if(req.session.user) {
            next();
        } else {
            req.flash('error', `you must be logged in`);
        }
    },
    isMyProfile: function(req, res, next) {
        //by default all profiles are private
        var { id } = req.params;
        if( id == req.session.user.userid) {
            next();
        } else {
            req.flash('error', "this is not your profile, this profile is private");
            req.session.save(function(err) {
                if(err) next(err);
                res.redirect('/index');
            })
        }
    },
};