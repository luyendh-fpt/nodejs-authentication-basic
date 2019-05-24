var Member = require('../models/member');

exports.register = function (req, resp) {
    resp.render('client/member/register');
}

exports.save = function (req, resp) {
    if (req.body.password === req.body.confirmPassword) {
        var obj = new Member(req.body);
        obj.save(function (err) {
            if (err) {
                return resp.status(500).send(err);
            } else {
                return resp.redirect('/');
            }
        });
    }
}

exports.login = function (req, resp) {
    resp.render('client/member/login');
}

exports.processLogin = function (req, resp) {
    Member.authenticate(req.body.username, req.body.password, function (error, member) {
        if (error) {
            return resp.status(401).send(error);
        } else if(!member){
            var err = new Error('Wrong email or password.');
            err.status = 401;
            return resp.send(err);
        } else {
            req.session.username = member.username;
            req.session.avatarUrl = member.avatarUrl;
            req.session.fullName = member.fullName;
            req.session.role = 'user';
            resp.redirect('/');
        }
    });
}

exports.processLogout = function (req, resp) {
    req.session.destroy(function (err) {
        return resp.redirect('/');
    });
}


