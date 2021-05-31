const express = require('express');
const passport = require('passport');
const loginController = require('../controllers/loginController');

const router = express.Router();

router
	.route('/login')
	.get(loginController.login)
	.post(passport.authenticate('login', { successRedirect: '/login', failureRedirect: '/faillogin' }));
router.get('/faillogin', loginController.failLogin);

router
	.route('/signup')
	.get(loginController.signUp)
	.post(passport.authenticate('signup', { successRedirect: '/login', failureRedirect: '/failsignup' }));
router.get('/failsignup', loginController.failSingUp);

router.get('/logout', loginController.logout);

module.exports = router;
