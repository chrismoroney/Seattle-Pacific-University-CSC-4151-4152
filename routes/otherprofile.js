var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    // res.render('index', { title: 'Express' });
    res.render('otherprofile.html', {
        root: 'views', username: "", firstName: "",
        lastName: "", bio: "", langExp: "",
        langLearn: ""})
});

router.get('/:username', function(req, res){
    var username = req.params.username;
        res.render('otherprofile.html', {
            root: 'views', username: username, firstName: "",
            lastName: "", bio: "", langExp: "",
            langLearn: ""});
});

module.exports = router;