var express = require('express');
var router = express.Router();
let multer = require('multer');
let storage = multer.diskStorage({
    destination: function(req, file, callback){
        callback(null, 'profileImages');
    },
    filename: function(req, file, callback) {
        file.originalname = Date.now().toString() + file.originalname.replace(/[^\w.]+/g, "");
        console.log(file);
        callback(null, file.originalname);
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
    res.render('upload.html', {root: 'views', username: req.session.username, message: req.file.originalname});
});

module.exports = router;