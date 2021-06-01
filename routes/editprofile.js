var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    if(!req.session.username){
        res.redirect('/');
    }
    res.render('editprofile.html', {root: 'views', username: req.session.username});
});

module.exports = router;