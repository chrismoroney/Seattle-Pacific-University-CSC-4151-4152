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
                // res.send({"error": error});
                res.redirect("/");
            } else {
                let userObj = User[0];
                // console.log(userObj);
                // console.log("hi");
                // console.log("hello" + userObj);
                // console.log(typeof(userObj.langLearn));
                // console.log(typeof(userObj.conversationalAbility));

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
                //doesn't work

                // console.log(req.session.bio);
                // console.log(username);
                // req.session.loggedIn = true;
                // console.log(req.session);
                // res.redirect('/homepage')
                // res.render('homepage.html', {root: 'views' , username: username});
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

    // var username = req.params.username;
    // let roomId = uuidV4();
    // console.log(overallFluencyAverage, "!!!");
    // res.render('otherprofile.html', {
    //     root: 'views', username: req.session.username, firstName: "",
    //     lastName: "", bio: "", langExp: "",
    //     langLearn: "", otherUsername: username, roomId: roomId,
    //     overallFluency: overallFluencyAverage, pronunciation: pronunciationAverage,
    //     conversationalAbility: conversationalAbilityAverage, listening: listeningAverage,
    //     speaking: speakingAverage},
    // );
});

module.exports = router;