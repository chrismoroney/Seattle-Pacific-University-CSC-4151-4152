var express = require('express');
var router = express.Router();

require('dotenv').config();
const { ExpressOIDC } = require('@okta/oidc-middleware');
const oidc = new ExpressOIDC({
    issuer: 'https://dev-83573246.okta.com/oauth2/default',
    client_id: '"0oa9wcmtxQ8EGmkBS5d6"',
    client_secret: 'BW-h_Rnp4KRYNsmVTIGFKHsZZt23J8fyC-Gg1Ext',

    appBaseUrl: 'http://localhost:3000',
    loginRedirectUri: 'http://localhost:3000/authorization-code/callback',
    logoutRedirectUri: 'http://localhost:3000/authorization-code/callback'
});

/* GET home page. */
router.get('/',oidc.ensureAuthenticated(),function(req, res, next) {
    // res.render('index', { title: 'Express' });
    //res.sendFile('login.html', {root: 'views'})
    console.log(req.userContext)
    if (req.userContext) {
        res.sendFile('homepage.html', {root: 'views'});
    } else {
        res.sendFile('pre-login.html', {root: 'views'});
    }
});

module.exports = router;