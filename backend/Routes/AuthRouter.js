const express = require('express');
const router = express.Router();

const { signup, signin } = require('../Controllers/AuthController');
const { signUpValidation, signInValidation } = require('../Middlewares/validation');

router.post('/sign-up/admin', signUpValidation, signup);
router.post('/sign-up/candidate', signUpValidation, signup);

router.post('/sign-in/admin', signInValidation, signin);
router.post('/sign-in/candidate', signInValidation, signin);

module.exports = router;
