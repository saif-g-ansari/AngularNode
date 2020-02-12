'use strict';

var express = require('express');
var controller = require('./common.controller');
var auth = require('../../Auth/auth.controller');
var router = express.Router();

router.get('/:collection' ,auth.isAuthenticated(),controller.get);
router.get('/:collection/:id',auth.isAuthenticated() ,controller.getById);
router.post('/:collection/:id', auth.isAuthenticated(),controller.update);
router.put('/:collection',auth.isAuthenticated() ,controller.create);
router.delete('/:collection/:id',auth.isAuthenticated() ,controller.delete);

module.exports = router;