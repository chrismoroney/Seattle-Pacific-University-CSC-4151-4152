let express = require('express');
let router = express.Router();
// For the Data Model
let Post = require('../models/Post.js');


function HandleError(response, reason, message, code){
    console.log('ERROR: ' + reason);
    response.status(code || 500).json({"error:": message});
}

router.get('/', (req, res) => {
    Post.find({},(err, posts)=> {
        // res.sendFile('posts.html', {root: 'views'});
        res.send(posts);
    })
})

router.post('/', (req, res) => {
    let post = new Post(req.body);
    post.save((err) =>{
        if(err)
            sendStatus(500);
        res.sendStatus(200);
    })
})

module.exports = router;