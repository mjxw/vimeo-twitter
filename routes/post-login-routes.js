const router = require('express').Router();
const path = require('path');

const authCheck = (req, res, next) => {
    if(!req.user) {
        res.redirect('/');
    } else {
        next();
    }
};

router.get('/', authCheck, (req, res) => {
    res.sendFile(path.join(__dirname, '../dist/index.html'));    
});

module.exports = router;