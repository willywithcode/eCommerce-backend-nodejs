'use strict'

const express = require('express');
const router = express.Router();
const { accessController } = require('../../controllers/access.controller');
const { authentication } = require('../../auth/authUtils');
const { asyncHandler } = require('../../helpers/asyncHanlder');


    
router.post('/shop/signup', asyncHandler(accessController.signUp));
router.post('/shop/login', asyncHandler(accessController.login));
router.post('/shop/logout', asyncHandler(accessController.logout));
router.post('/shop/hanldeRefreshToken', asyncHandler(accessController.handleRefreshToken));
    
router.use(authenticationV2);
module.exports = router;