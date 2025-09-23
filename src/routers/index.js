'use strict'

const express = require('express');
const { apiKey, permission } = require('../auth/checkAuth');
const router = express.Router();

//check api key
router.use(apiKey);
// check permission
router.use(permission('0000'));



// router.get('', (req, res, next) => {
//     return res.status(200).json({
//         message: 'Welcome to the API'
//     });
// });
router.use('/v1/api', require('./access'));

module.exports = router;