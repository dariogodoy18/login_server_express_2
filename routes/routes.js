const express = require('express');
const router = express.Router();
const passport = require('passport')
const controllers = require('../controllers/controllers')

/* GET home page. */
router.get('/', controllers.homeControllers.index)

//Routes of users
router.get('/signup', controllers.userControllers.getSignUp)

router.get('/login', controllers.userControllers.getLogin)

router.post('/signup', controllers.userControllers.postSignUp)

router.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
}))

module.exports = router;
