var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    // res.render('index', { title: 'Express' });
    if(!req.session.username){
        res.redirect('/');
    }
    res.render('searchprofile.html', {root: 'views', username: req.session.username})
});

module.exports = router;