var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    if(!req.session.username){
        res.redirect('/');
    }
    res.render('viewblocked.html', {root: 'views', username: req.session.username})
});

module.exports = router;