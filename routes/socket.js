var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    if(!req.session.username){
        res.redirect('/');
    }
    res.sendFile('socket.html', {root: 'views'})
});

module.exports = router;
