var express = require('express');
var router = express.Router();

router.get('/', (req, res)=>
    res.render('replyBox.html', {root: 'views', username: req.session.username})
);

module.exports = router;