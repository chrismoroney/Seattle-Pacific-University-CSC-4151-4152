// var express = require('express');
// var router = express.Router();
//
// /* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });
//
// module.exports = router;


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

    if (!newUser.Name || !newUser.Password) {
        HandleError(response, 'Missing Info', 'Form data missing', 500);
    } else {
        let user = new User({
            Name: newUser.Name,
            Password: newUser.Password
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

  let name = request.query['name'];
  if (name){
    User
        .find({"Name": name})
        .exec( (error, User) => {
          if (error){
            response.send({"error": error});
          }else{
            response.send(User);
          }
        });
  }else{
    // User
    //     .find()
    //     .exec( (error, User) => {
    //       if (error){
    //         response.send({"error": error});
    //       }else{
    //         response.send(User);
    //       }
    //     });
  }
} );

// router.get('/:isbn', (request, response, next) =>{
//   response.header("Access-Control-Allow-Origin", "*");
//   response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//
//   var re = /^(?=(?:\D*\d){10}(?:(?:\D*\d){3})?$)[\d-]+$/;
//   var match = re.exec(request.params.isbn);
//
//   if(!match){
//     HandleError(response, 'Invalid ISBN', 'ISBN format is invalid', 500);
//   }else{
//     User
//         .find({"ISBN": request.params.isbn}, (error, result) =>{
//           if (error) {
//             response.status(500).send(error);
//           }
//           if (result && result.length > 0){
//             response.send(result);
//           }else{
//             response.status(404).send({"isbn": request.params.isbn, "error":  "Not Found"});
//           }
//         });
//   }
// });
//
//
// router.patch('/:isbn', (request, response, next) =>{
//   response.header("Access-Control-Allow-Origin", "*");
//   response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//
//   var re = /^(?=(?:\D*\d){10}(?:(?:\D*\d){3})?$)[\d-]+$/;
//   var match = re.exec(request.params.isbn);
//
//   if(!match){
//     HandleError(response, 'Invalid ISBN', 'ISBN format is invalid', 500);
//   }else {
//     User
//         .findOne({"ISBN": request.params.isbn}, (error, result) => {
//           if (error) {
//             response.status(500).send(error);
//             // console.log("test error");
//           } else if (result) {
//             if (request.body.isbn) {
//               delete request.body.isbn;
//             }
//             for (let field in request.body) {
//               if(!request.body[field] || request.body[field].length == 0){
//                 HandleError(response, 'Missing field', 'One or more fields is missing', 500);
//               }else{
//                 result[field] = request.body[field];
//               }
//             }
//             result.save((error, friend) => {
//               if (error) {
//                 response.status(500).send(error);
//               }
//               response.send(friend);
//             });
//           } else {
//             response.status(404).send({"ISBN": request.params.isbn, "error": "Not Found"});
//           }
//
//         });
//   }
// });

// router.delete('/:isbn', (request, response, next) =>{
//   response.header("Access-Control-Allow-Origin", "*");
//   response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//
//   var re = /^(?=(?:\D*\d){10}(?:(?:\D*\d){3})?$)[\d-]+$/;
//   var match = re.exec(request.params.isbn);
//
//   if(!match){
//     HandleError(response, 'Invalid ISBN', 'ISBN format is invalid', 500);
//   }else {
//     User
//         .findOne({"ISBN": request.params.isbn}, (error, result) => {
//           if (error) {
//             response.status(500).send(error);
//           } else if (result) {
//             result.remove((error) => {
//               if (error) {
//                 response.status(500).send(error);
//               }
//               response.send({"deletedISBN": request.params.isbn});
//             });
//           } else {
//             response.status(404).send({"ISBN": request.params.isbn, "error": "Not Found"});
//           }
//         });
//   }
// });

module.exports = router;