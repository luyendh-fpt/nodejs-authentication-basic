var express = require('express');
var memberController = require('../controllers/memberController');
var router = express.Router();


/* GET users listing. */
router.get('/register', memberController.register);
router.post('/register', memberController.save);

router.get('/login', memberController.login);
router.post('/login', memberController.processLogin);
router.get('/logout', memberController.processLogout);

module.exports = router;
