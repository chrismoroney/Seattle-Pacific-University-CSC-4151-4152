var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    // res.render('index', { title: 'Express' });
    res.render('myprofile.html', {root: 'views', username: req.session.username, bio: req.session.bio})
});

module.exports = router;
