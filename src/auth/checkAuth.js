'use strict'

const HEADER = {
    API_KEY : 'x-api-key',
    AUTHORIZATIONB: 'authorization'
}

const findById = require('../services/apiKey.service').findById;
const apiKey = async (req, res,next) => {
    try {
        const key = req.headers[HEADER.API_KEY]?.toString();
        if (!key) {
            return res.status(403).json({
                message: 'Forbidden Error'
            })
        }
        //check objectkey
        const objKey = await findById(key);
        if(!objKey) {
            return res.status(403).json({
                message: 'Forbidden Error'
            })
        }
        req.objKey = objKey;
        return next();
    } catch (error) {

    }
}

const permission = (permission) => {
    return (req, res, next) => {
        if(!req.objKey.permissions) {
            return res.status(403).json({
                message: 'Permission denied'
            });
        }
        console.log('Permissions: ', req.objKey.permissions);
        const validPermissions = req.objKey.permissions.includes(permission);
        if(!validPermissions) {
            return res.status(403).json({
                message: 'Permission denied'
            });
        }
        return next();
    }
}

module.exports = {
    apiKey,
    permission
}