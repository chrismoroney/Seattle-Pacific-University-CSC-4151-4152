var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    if(!req.session.username){
        res.redirect('/');
    }
    res.render('myprofile.html', {root: 'views', username: req.session.username, firstname: req.session.firstname,
        lastname: req.session.lastname, bio: req.session.bio, langExp: req.session.langExp, langLearn: req.session.langLearn,
        overallFluency: req.session.overallFluency, pronunciation: req.session.pronunciation,
        conversationalAbility: req.session.conversationalAbility, listening: req.session.listening,
        speaking: req.session.speaking
    })
});

module.exports = router;