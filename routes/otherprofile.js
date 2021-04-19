var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    // res.render('index', { title: 'Express' });
    res.render('otherprofile.html', {
        root: 'views', username: "test username", firstName: "test firstname",
        lastName: "test lastname", bio: "test bio", langExp: "test langExp",
        langLearn: "test langLearn"})
});

module.exports = router;