// For the routes
let express = require('express');
let router = express.Router();
// For the Data Model
let User = require('../models/User.js');


function HandleError(response, reason, message, code){
    console.log('ERROR: ' + reason);
    response.status(code || 500).json({"error:": message});
}

router.post('/', (request, response, next) => {
    response.header("Access-Control-Allow-Origin", "*");
    response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

    let obj = JSON.parse(JSON.stringify(request.body));
    let newUser = obj;
    console.log(newUser);

    if (!newUser.firstname || !newUser.lastname || !newUser.username || !newUser.password || !newUser.confirmpassword) {
        HandleError(response, 'Missing Info', 'Form data missing', 500);
    } else if (newUser.password != newUser.confirmpassword){
        HandleError(response, 'Passwords not matching', 'Passwords do not match', 500);
    } else {
        let user = new User({
            firstname: newUser.firstname,
            lastname: newUser.lastname,
            username: newUser.username,
            password: newUser.password,
            confirmpassword: newUser.confirmpassword,
        });
        user.save((error) => {
            if (error) {
                response.send({"error": error});
            } else {
                response.send({"id": user._id});
            }
        });
    }
});

router.get('/', (request, response, next) => {
    response.header("Access-Control-Allow-Origin", "*");
    response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

    // firstname and lastname if found produces [this.response] instead of just this.response
    let name = request.query['firstname'];
    if (name){
        User
            // need to adjust for case sensitivity
            .find({"firstname": firstname})
            .exec( (error, User) => {
                if (error){
                    response.send({"error": error});
                } else {
                    response.send(User);
                }
            });
    } else {
        User
            .find()
            .exec( (error, User) => {
                if (error){
                    response.send({"error": error});
                } else {
                    response.send(User);
                }
            });
    }
} );

router.get('/:username', (request, response, next) =>{
    let username = request.query['username'];
    User
        .find({"username": username}, (error, result) =>{
            if (error) {
                response.status(500).send(error);
            }
            if (result) {
                response.send(result);
            } else {
                response.status(404).send({"id": request.params.id, "error":  "Not Found"});
            }

        });
});
router.patch('/:username', (request, response, next) =>{
    User
        .findOne({"username": request.params.username}, (error, result)=>{
            if (error) {
                response.status(500).send(error);
            } else if (result){
                if (request.body.username) {
                    delete request.body.username;
                }
                for (let field in request.body){
                    result[field] = request.body[field];
                }
                result.save((error, book)=>{
                    if (error){
                        response.status(500).send(error);
                    }
                    response.send(book);
                });
            } else {
                response.status(404).send({"username": request.params.username, "error":  "Not Found"});
            }

        });
});
module.exports = router;