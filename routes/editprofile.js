var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    // res.render('index', { title: 'Express' });
    res.render('editprofile.html', {root: 'views', username: req.session.username});
});

module.exports = router;