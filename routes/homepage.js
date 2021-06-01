var express = require('express');
var router = express.Router();

require('dotenv').config();
/* GET home page. */
router.get('/', function(req, res, next) {
    if(!req.session.username){
        res.redirect('/');
    }
    res.render('homepage.html', {root: 'views' , username: req.session.username});
});

module.exports = router;
