var express = require('express');
var router = express.Router();
let multer = require('multer');
let storage = multer.diskStorage({
    destination: function(req, file, callback){
        callback(null, './profilepics/');
    },
    filename: function(req, file, callback) {
        file.originalname = username + file.originalname.replace("[^\\w\\s-.", "");
        callback(null, file.originalname);
        console.log(file);
    }
});
let filter = function(req, file, callback){
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg' || file.mimetype === 'image/png'){
        callback(null, true);
    } else {
        callback(null, false);
    }
}
let upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: filter
});
var img;
router.post('/', upload.single('profileImage'), function(req, res, next){
    let url = "https://lingojiveapi.herokuapp.com/users/" + username;
    let sendImage = new XMLHttpRequest();
        if (this.readyState == 4 && this.status == 200){
            if(req.file != undefined){
                img = username + req.file.originalname.replace("[^\\w\\s-.", "");
            }
        };
    sendImage.open('PATCH', url,true);
    sendImage.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    sendImage.send("profileImage=" + img);
});

/* GET home page. */
router.get('/', function(req, res, next) {
    // res.render('index', { title: 'Express' });
    res.render('editprofile.html', {root: 'views', username: req.session.username});
});

module.exports = router;