const express = require('express');

const { registerUserController, loginUserController } = require('../controller/authControllers');

const router = express.Router();

router.post('/userRegistration', registerUserController);

router.post('/login', loginUserController);

module.exports = router;