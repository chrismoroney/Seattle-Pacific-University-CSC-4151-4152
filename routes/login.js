var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/',function(req, res, next) {
    // res.render('index', { title: 'Express' });
    //res.sendFile('login.html', {root: 'views'})
    // console.log(req.userContext);
    // if (req.userContext) {
    if(req.session.loggedIn){
        res.sendFile('homepage.html', {root: 'views'});
    } else {
        res.sendFile('login.html', {root: 'views'});
    }
});

module.exports = router;