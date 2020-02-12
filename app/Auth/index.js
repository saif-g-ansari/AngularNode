'use strict';
var express = require('express');
var auth = require('./auth.controller');
var router = express.Router();

router.post('/login', auth.login);
router.post('/register', auth.register);

module.exports = router;                