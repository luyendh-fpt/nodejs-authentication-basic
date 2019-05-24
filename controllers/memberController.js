var Member = require('../models/member');
var crypto = require('crypto');
const saltLength = 7;
const algorithName = 'sha256';

exports.register = function (req, resp) {
    resp.render('client/member/register');
}

exports.save = function (req, resp) {
    if (req.body.password === req.body.confirmPassword) {
        var obj = new Member(req.body);

        var salt = generateSalt(saltLength); // tạo muối.
        var algorith = crypto.createHmac(algorithName, salt); // tạo thuật toán.
        var passwordHash = algorith.update(obj.password).digest('hex'); // băm chuỗi password đầu vào.
        obj.password = passwordHash;
        obj.salt = salt;
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
    var username = req.body.username;
    Member.findOne({
        'username': username
    }, function (error, member) {
        if (error) {
            resp.send('Invalid account information with error');
        } else if (!member) {
            resp.send('Invalid account information.');
        } else {
            var inputPassword = req.body.password;
            var salt = member.salt;
            var passwordHash = member.password;

            var algorith = crypto.createHmac(algorithName, salt); // tạo thuật toán.
            var passwordHashToCompare = algorith.update(inputPassword).digest('hex'); // băm chuỗi password đầu vào.
            if (passwordHashToCompare === passwordHash) {
                req.session.username = member.username;
                req.session.avatarUrl = member.avatarUrl;
                req.session.fullName = member.fullName;
                resp.redirect('/');
            } else {
                resp.send('Invalid account information.');
            }
        }
    });
}


exports.processLogout = function (req, resp) {
    req.session.destroy(function (err) {
        return resp.redirect('/');
    });
}


function generateSalt(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}