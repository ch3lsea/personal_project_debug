var express = require('express');
var router = express.Router();
var path = require('path');
var passport = require('passport');

/* GET home page. */
router.post('/', passport.authenticate('local'), function(req, res) {
    res.send(req.user);
});

router.get('/loggedin', function(req, res) {
    res.send(req.isAuthenticated() ? req.user : '0');
});

module.exports = router;
