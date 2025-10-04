'use strict'


const express = require('express');
const { authentication } = require('../../auth/authUtils');
const { asyncHandler } = require('../../helpers/asyncHanlder');
const productController = require('../../controllers/product.controller');
const router = express.Router();


router.use(authentication)

router.post('', asyncHandler(productController.createProduct))

module.exports = router;