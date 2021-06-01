var express = require('express');
var router = express.Router();

router.get('/',function(req, res, next) {
    if(req.session.loggedIn){
        res.render('homepage.html', {root: 'views', username: req.session.username});
    } else {
        res.render('login.html', {root: 'views', message: "Page will reload with incorrect sign-in."});
    }
});

module.exports = router;