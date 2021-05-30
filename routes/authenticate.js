var express = require('express');
const session = require('express-session')
const bodyParser = require('body-parser')
const path = require('path')
var router = express.Router();
let User = require('../models/User.js');
var username;
var password;
var userObj;

router.post('/'
    ,bodyParser.urlencoded({ extended: true })
    ,(req,res,next)=>
    {
        username = req.body.username;
        console.log(username);
        password = req.body.password;
        if (username && password){
            User
                // need to adjust for case sensitivity
                .find({"username": username})
                .exec( (error, User) => {
                    if (error || User.length == 0){
                        // res.send({"error": error});
                        res.redirect("/");
                    } else {
                        userObj = User[0];
                        // console.log(userObj);
                        // console.log("hi");
                        console.log("hello" + userObj);
                        console.log(typeof(userObj.langLearn));
                        console.log(typeof(userObj.conversationalAbility));
                    if(userObj.username == username && userObj.password == password){
                        res.locals.username = username;
                        req.session.username = username;
                        res.locals.bio = userObj.bio;
                        req.session.bio = userObj.bio;
                        res.locals.firstname = userObj.firstname;
                        req.session.firstname = userObj.firstname;
                        res.locals.lastname = userObj.lastname;
                        req.session.lastname = userObj.lastname;
                        res.locals.password = userObj.password;
                        req.session.password = userObj.password;
                        res.locals.langExp = userObj.langExp;
                        req.session.langExp = userObj.langExp;
                        res.locals.langLearn = userObj.langLearn;
                        req.session.langLearn = userObj.langLearn;
                        res.locals.blocking = userObj.blocking;
                        req.session.blocking = userObj.blocking;
                        res.locals.blockedBy = userObj.blockedBy;
                        req.session.blockedBy = userObj.blockedBy;

                        // doesn't work
                        let overallFluencyTotal = 0;
                        for(let i = 0; i < userObj.overallFluency.length; ++i){
                            overallFluencyTotal += userObj.overallFluency[i];
                        }
                        let overallFluencyAverage = overallFluencyTotal / userObj.overallFluency.length;
                        res.locals.overallFluency = overallFluencyAverage;
                        req.session.overallFluency = overallFluencyAverage;
                        console.log(overallFluencyAverage);

                        let pronunciationTotal = 0;
                        for(let i = 0; i < userObj.pronunciation.length; ++i){
                            pronunciationTotal += userObj.pronunciation[i];
                        }
                        let pronunciationAverage = pronunciationTotal / userObj.pronunciation.length;
                        res.locals.pronunciation = pronunciationAverage;
                        req.session.pronunciation = pronunciationAverage;
                        console.log(pronunciationAverage);

                        let conversationalAbilityTotal = 0;
                        for(let i = 0; i < userObj.conversationalAbility.length; ++i){
                            conversationalAbilityTotal += userObj.conversationalAbility[i];
                        }
                        let conversationalAbilityAverage = conversationalAbilityTotal / userObj.conversationalAbility.length;
                        res.locals.conversationalAbility = conversationalAbilityAverage;
                        req.session.conversationalAbility = conversationalAbilityAverage;
                        console.log(conversationalAbilityAverage);

                        let listeningTotal = 0;
                        for(let i = 0; i < userObj.listening.length; ++i){
                            listeningTotal += userObj.listening[i];
                        }
                        let listeningAverage = listeningTotal / userObj.listening.length;
                        res.locals.listening = listeningAverage;
                        req.session.listening = listeningAverage;
                        console.log(listeningAverage);

                        let speakingTotal = 0;
                        for(let i = 0; i < userObj.speaking.length; ++i){
                            speakingTotal += userObj.speaking[i];
                        }
                        let speakingAverage = speakingTotal / userObj.speaking.length;
                        res.locals.speaking = speakingAverage;
                        req.session.speaking = speakingAverage;
                        console.log(speakingAverage);
                        //doesn't work

                        console.log(req.session.bio);
                        // console.log(username);
                        req.session.loggedIn = true;
                        console.log(req.session);
                        // res.redirect('/homepage')
                        res.render('homepage.html', {root: 'views' , username: username});
                    }else{
                            res.redirect('/');
                        }
                    }
                });
        } else {
            res.redirect("/");
        }

        // var response = [];
        // let url = "http://lingojiveapi.herokuapp.com/users/" + req.body.username;
        // let xhttp = new XMLHttpRequest();
        //  xhttp.onreadystatechange = function(){
        //      response = (JSON.parse(this.responseText))[0];
        //  };
        //  xhttp.open("GET", url, true);
        //  xhttp.send();
        //
        //  if(response.length > 0 && req.body.password == response.password)
        //  {
        //      res.locals.username = req.body.username
        //      next()
        //  }
        //  else
        //      res.sendStatus(401)
        // next();
    }
    // ,(req,res)=>
    // {
    //     console.log("hello" + userObj);
    // // if(userObj[0].username == username && userObj[0].password == password){
    //     res.locals.username = username;
    //     req.session.username = username;
    //     // console.log(username);
    //     req.session.loggedIn = true
    //     console.log(req.session)
    //     res.redirect('/homepage')
    //
    //     // }else{
    //     //     res.redirect('/login');
    //     // }
    // }
    );

module.exports = router;