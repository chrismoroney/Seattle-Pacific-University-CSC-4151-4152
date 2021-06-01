let express = require('express');
let router = express.Router();

function HandleError(response, reason, message, code){
    console.log('ERROR: ' + reason);
    response.status(code || 500).json({"error:": message});
}

router.get('/', (req, res) => {
    if(!req.session.username){
        res.redirect('/');
    }
    res.render('messenger.html', {root: 'views' , username: req.session.username});
})

module.exports = router;