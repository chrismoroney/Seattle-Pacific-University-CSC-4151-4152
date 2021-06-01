var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    if(!req.session.username){
        res.redirect('/');
    }
    res.render('myprofile.html', {root: 'views', username: req.session.username, firstname: req.session.firstname,
        lastname: req.session.lastname, bio: req.session.bio, langExp: req.session.langExp, langLearn: req.session.langLearn,
        overallFluency: (req.session.overallFluency).toPrecision(2),
        pronunciation: req.session.pronunciation.toPrecision(2),
        conversationalAbility: req.session.conversationalAbility.toPrecision(2),
        listening: req.session.listening.toPrecision(2),
        speaking: req.session.speaking.toPrecision(2)
    })
});

module.exports = router;