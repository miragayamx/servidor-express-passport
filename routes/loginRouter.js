const express = require('express');
const loginController = require('../controllers/loginController');

const router = express.Router();

router.get('/login', loginController.login);
router.get('/logout', loginController.logout);

router.post('/login', loginController.setCurrentUser);

module.exports = router;
