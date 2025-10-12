'use strict'
const JWT = require('jsonwebtoken');
const { asyncHandler } = require('../helpers/asyncHanlder');
const { AuthFailureError, NotFoundError } = require('../core/error.response');
const { findByUserId } = require('../services/keyToken.service');

const HEADER = {
    API_KEY: "x-api-key",
    CLIENT_ID: "x-client-id",
    AUTHORIZATION: "authorization",
    REFRESHTOKEN: "x-rtoken-id"
}

const createTokenPair = async (payload, PublicKeyCredential, privateKey) => {
    try {
        const accessToken = await JWT.sign(payload, privateKey, {
            // algorithm: 'RS256',
            expiresIn: '2 days'
        })

        const refreshToken = await JWT.sign(payload, PublicKeyCredential, {
            // algorithm: 'RS256',
            expiresIn: '7 days'
        })
        return { accessToken, refreshToken }
    } catch (error) {

    }
}

const authentication = asyncHandler(async (req, res, next) => {
    // check userId missing
    // get access token
    // verify token
    // check user is db
    // check keyStore with this userId
    // Oka all => return next();

    const userId = req.headers[HEADER.CLIENT_ID];
    if (!userId) throw new AuthFailureError('Invalid request');

    const keyStore = await findByUserId(userId);
    if (!keyStore) throw new NotFoundError('Not found keyStore');
    const accessToken = req.headers[HEADER.AUTHORIZATION];
    if (!accessToken) throw new AuthFailureError('Invalid request');

    try {
        const decodeUser = JWT.verify(accessToken, keyStore.publicKey);
        if (userId !== decodeUser.userId) throw new AuthFailureError('Invalid User');
        req.keyStore = keyStore;
        return next();
    } catch (error) {
        throw error;
    }
})

const authenticationV2 = asyncHandler(async (req, res, next) => {
    // check userId missing
    // get access token
    // verify token
    // check user is db
    // check keyStore with this userId
    // Oka all => return next();

    const userId = req.headers[HEADER.CLIENT_ID];
    if (!userId) throw new AuthFailureError('Invalid request');

    const keyStore = await findByUserId(userId);
    if (!keyStore) throw new NotFoundError('Not found keyStore');


    if (req.headers[HEADER.REFRESHTOKEN]) {
        try {
            const refreshToken = req.headers[HEADER.REFRESHTOKEN];
            if (!refreshToken) throw new AuthFailureError('Invalid request');

            const decodeUser = await verifyToken(refreshToken, keyStore.privateKey);
            if (userId !== decodeUser.userId) throw new AuthFailureError('Invalid User');
            req.keyStore = keyStore;
            req.user = decodeUser;
            req.refreshToken = refreshToken;
            return next();
        } catch (error) {
            throw error;
        }
    }

    const accessToken = req.headers[HEADER.AUTHORIZATION];
    if (!accessToken) throw new AuthFailureError('Invalid request');

    try {
        const decodeUser = await verifyToken(accessToken, keyStore.publicKey);
        if (userId !== decodeUser.userId) throw new AuthFailureError('Invalid User');
        req.keyStore = keyStore;
        req.user = decodeUser;
        return next();
    } catch (error) {
        throw error;
    }
})

const verifyToken = async (token, keySecret) => {
    return await JWT.verify(token, keySecret);
}
module.exports = {
    createTokenPair,
    authentication,
    authenticationV2,
    verifyToken
}