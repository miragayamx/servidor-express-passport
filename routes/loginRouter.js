const express = require('express');
const loginController = require('../controllers/loginController');

const router = express.Router();

router.get('/login', loginController.login);
router.get('logout', loginController.login);

router.post('/login', loginController.setCurrentUser);

module.exports = router;