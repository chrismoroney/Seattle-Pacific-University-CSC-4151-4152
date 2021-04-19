var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    // res.render('index', { title: 'Express' });
    res.render('otherprofile.html', {
        root: 'views', username: "test username", firstName: "test firstname",
        lastName: "test lastname", bio: "test bio", langExp: "test langExp",
        langLearn: "test langLearn"})
});

router.get('/:username', function(req, res){
    var username = req.params.username;
    // var firstName;
    // var lastName;
    // var bio;
    // var langExp;
    // var langLearn;
    //         for (let user in users){
//             table +=
//                 '       <tr>\n' +
//                 '           <td>' + users[user]["username"]+  '</td>\n' +
//                 '           <td>' + users[user]["firstname"] + " " + users[user]["lastname"] + '</td>\n' +
//                 '           <td>' + users[user]["langExp"]+  '</td>\n' +
//                 '           <td>' + users[user]["langLearn"]+  '</td>\n' +
//                 '           <td><button onclick="window.location.href=\'/otherprofile\'" id="gotoprofile">View Profile</button></td> \n'+
//                 '       </tr>\n';
//         }


        // let url = "http://lingojiveapi.herokuapp.com/users/" + username;
        // let xhttp = new XMLHttpRequest();
        // xhttp.onreadystatechange = function(){
        //     if (this.readyState == 4 && this.status == 200){
        //         // let users = this.responseText;
        //         // for(let user in users){
        //         //     firstName = user["firstname"];
        //         //     lastName = user["lastname"];
        //         //     langLearn = user["langLearn"];
        //         //     langExp = user["langExp"];
        //         //     bio = user["bio"];
        //         // }
        //
        //         // res.render('otherprofile.html', {
        //         //     root: 'views', username: username, firstName: firstName,
        //         //     lastName: lastName, bio: bio, langExp: langExp,
        //         //     langLearn: langLearn})
        //
        //     res.render('otherprofile.html', {
        //                 root: 'views', username: "test username", firstName: "test firstname",
        //                 lastName: "test lastname", bio: "test bio", langExp: "test langExp",
        //                 langLearn: "test langLearn"})
        //     } else if (this.status == 404) {
        //         console.log("error");
        //     }
        // };
        // xhttp.open("GET", url, true);
        // xhttp.send();
        res.render('otherprofile.html', {
            root: 'views', username: username, firstName: "test firstname",
            lastName: "test lastname", bio: "test bio", langExp: "test langExp",
            langLearn: "test langLearn"});
});

module.exports = router;