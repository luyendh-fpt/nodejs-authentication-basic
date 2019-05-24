var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res) {
    var responseData = {
        'title': 'Express',
        'username': req.session.username,
        'fullName': req.session.fullName,
        'avatarUrl': req.session.avatarUrl
    }
    res.render('index', responseData);
});

module.exports = router;
