// Create instance of Router
const router = require('express').Router(); 
const passport = require('passport');
const path = require('path');


// Auth with google 
router.get('/google', passport.authenticate('google', {
    scope: ['profile']
}));

// Auth logout
router.get('/logout', (req, res) => {
    res.send('logging out');
});

// Callback route for google to redirect to
router.get('/google/redirect', passport.authenticate('google'), (req, res) => {
    res.redirect('/post-login/')
});

module.exports = router;