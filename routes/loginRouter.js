const express = require('express');
const passport = require('passport');
const loginController = require('../controllers/loginController');

const router = express.Router();

router
	.route('/login')
	.get(loginController.login)
	.post(passport.authenticate('login', { failureRedirect: '/faillogin' }), loginController.postLogin);
router.get('/faillogin', loginController.failLogin);

router
	.route('/signup')
	.get(loginController.signUp)
	.post(passport.authenticate('signup', { failureRedirect: '/failsignup' }), loginController.registerUser);
router.get('/failsignup', loginController.failSingUp);

router.get('/logout', loginController.logout);

module.exports = router;
