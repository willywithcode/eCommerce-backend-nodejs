'use strict'

const express = require('express');
const router = express.Router();
const { accessController } = require('../../controllers/access.controller');
const {asynHandler} = require('../../helpers/asyncHandler');


    
router.post('/shop/signup', asyncHandler(accessController.signUp));

module.exports = router;