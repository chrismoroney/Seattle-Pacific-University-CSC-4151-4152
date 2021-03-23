var express = require('express');
const session = require('express-session')
const bodyParser = require('body-parser')
const path = require('path')
var router = express.Router();
let User = require('../models/User.js');

router.post('/'
    ,bodyParser.urlencoded({ extended: true })
    ,(req,res,next)=>
    {
        var username = req.body.username;
        var password = req.body.password;
        var userObj;
        if (username){
            User
                // need to adjust for case sensitivity
                .find({"username": username})
                .exec( (error, User) => {
                    if (error){
                        res.send({"error": error});
                    } else {
                        userObj = User;
                    }
                });
        } else {
            res.redirect("/login");
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
        next();
    }
    ,(req,res)=>
    {
        // if(userObj.username == username && userObj.password == password){
        //     res.locals.username = username;
        //     req.session.username = res.locals.username;
            req.session.loggedIn = true
            // req.session.username = res.locals.username
            console.log(req.session)
            res.redirect('/homepage')

        // }else{
        //     res.redirect('/login');
        // }
    }
    );

module.exports = router;