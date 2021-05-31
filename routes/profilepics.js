var express = require('express');
var router = express.Router();

router.get('/', (req, res)=> {
    if(!req.session.username){
        res.redirect('/');
    }
    res.render('profilepics.html', {root: 'views', username: req.session.username})
});

module.exports = router;