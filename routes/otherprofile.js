var express = require('express');
var router = express.Router();
const {v4 : uuidV4 } = require('uuid');

/* GET home page. */
router.get('/', function(req, res, next) {
    if(!req.session.username){
        res.redirect('/');
    }
    res.render('otherprofile.html', {
        root: 'views', username: "", firstName: "",
        lastName: "", bio: "", langExp: "",
        langLearn: ""})
});

router.get('/:username', function(req, res){
    if(!req.session.username){
        res.redirect('/');
    }
    var overallFluencyAverage = 0;
    var pronunciationAverage = 0;
    var conversationalAbilityAverage = 0;
    var listeningAverage = 0;
    var speakingAverage = 0;

    let User = require('../models/User.js');
    User
        // need to adjust for case sensitivity
        .find({"username": req.params.username})
        .exec( (error, User) => {
            if (error || User.length == 0){
                res.redirect("/");
            } else {
                let userObj = User[0];

                var bio = userObj.bio;
                var firstname = userObj.firstname;
                var lastname = userObj.lastname;
                var password = userObj.password;
                var langExp = userObj.langExp;
                var langLearn = userObj.langLearn;
                var blocking = userObj.blocking;
                var blockedBy = userObj.blockedBy;

                // doesn't work
                var overallFluencyTotal = 0;
                for(let i = 0; i < userObj.overallFluency.length; ++i){
                    overallFluencyTotal += userObj.overallFluency[i];
                }
                overallFluencyAverage = overallFluencyTotal / userObj.overallFluency.length;
                console.log(overallFluencyAverage);

                var pronunciationTotal = 0;
                for(let i = 0; i < userObj.pronunciation.length; ++i){
                    pronunciationTotal += userObj.pronunciation[i];
                }
                pronunciationAverage = pronunciationTotal / userObj.pronunciation.length;
                console.log(pronunciationAverage);

                var conversationalAbilityTotal = 0;
                for(let i = 0; i < userObj.conversationalAbility.length; ++i){
                    conversationalAbilityTotal += userObj.conversationalAbility[i];
                }
                conversationalAbilityAverage = conversationalAbilityTotal / userObj.conversationalAbility.length;
                console.log(conversationalAbilityAverage);

                var listeningTotal = 0;
                for(let i = 0; i < userObj.listening.length; ++i){
                    listeningTotal += userObj.listening[i];
                }
                listeningAverage = listeningTotal / userObj.listening.length;
                console.log(listeningAverage);

                var speakingTotal = 0;
                for(let i = 0; i < userObj.speaking.length; ++i){
                    speakingTotal += userObj.speaking[i];
                }
                speakingAverage = speakingTotal / userObj.speaking.length;
                console.log(speakingAverage);
                var username = req.params.username;
                let roomId = uuidV4();
                console.log(overallFluencyAverage, "!!!");
                res.render('otherprofile.html', {
                    root: 'views', username: req.session.username, firstName: "",
                    lastName: "", bio: "", langExp: "",
                    langLearn: "", otherUsername: username, roomId: roomId,
                    overallFluency: overallFluencyAverage.toPrecision(2),
                    pronunciation: pronunciationAverage.toPrecision(2),
                    conversationalAbility: conversationalAbilityAverage.toPrecision(2),
                    listening: listeningAverage.toPrecision(2),
                    speaking: speakingAverage.toPrecision(2)},
                );
            }
        });
});

module.exports = router;