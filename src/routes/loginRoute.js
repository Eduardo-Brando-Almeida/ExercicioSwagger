const express = require('express')
const router = express.Router()

const userAuth = require('../../auth');

router.post('/login', userAuth.login);

module.exports = router;