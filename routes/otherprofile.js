var express = require('express');
var router = express.Router();
const {v4 : uuidV4 } = require('uuid');

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
    let roomId = uuidV4();
    res.render('otherprofile.html', {
        root: 'views', username: req.session.username, firstName: "",
        lastName: "", bio: "", langExp: "",
        langLearn: "", otherUsername: username, roomId: roomId});
});

module.exports = router;