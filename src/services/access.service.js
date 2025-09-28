'use strict'

const shopModel = require('../models/shop.model');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const KeyTokenService = require('./keyToken.service');
const { createTokenPair } = require('../auth/authUtils');
const { type } = require('os');
const { getIntoData } = require('../utils');
const { BadRequestError, ConflictRequestError, AuthFailureError } = require('../core/error.response');
const { ref } = require('process');
const { findByEmail } = require('./shop.service');
const RolesShop = {
    SHOP: "SHOP",
    WRITER: "WRITER",
    EDIT: 'EDIT',
    ADMIN: 'ADMIN',
}


class AccessService {
    //check email
    //match password
    //create AT and RT and save
    // generate tokens
    //get data return login
    static login = async ({ email, password, refreshToken = null }) => {
        const foundShop = await findByEmail({ email });
        if (!foundShop) {
            throw new BadRequestError("Shop not registered");
        }
        const match = bcrypt.compare(password, foundShop.password);
        if (!match) {
            throw new AuthFailureError("Authentication error");
        }
        const privateKey = crypto.randomBytes(64).toString('hex');
        const publicKey = crypto.randomBytes(64).toString('hex');

        const tokens = await createTokenPair({ userId: foundShop._id, email }, publicKey, privateKey);
        await KeyTokenService.createKeyToken({
            userId: foundShop._id,
            publicKey,
            privateKey,
            refreshToken: tokens.refreshToken
        })
        return {
            metadata: {
                shop: getIntoData({
                    fileds: ['_id', 'name', 'email'],
                    object: foundShop
                }),
                tokens
            }
        }
    }
    static signUp = async ({ name, email, password }) => {
        try {
            // check email exist

            const holderShop = await shopModel.findOne({ email }).lean();
            if (holderShop) {
                throw new BadRequestError("Error: Shop already registered");
            }
            const passwordHash = await bcrypt.hash(password, 10);
            const newShop = await shopModel.create({
                name, email, password: passwordHash, roles: [RolesShop.SHOP]
            });
            if (newShop) {
                const privateKey = crypto.randomBytes(64).toString('hex');
                const publicKey = crypto.randomBytes(64).toString('hex');

                console.log({ privateKey, publicKey }); // save db

                const keyStore = await KeyTokenService.createKeyToken({
                    userId: newShop._id,
                    publicKey,
                    privateKey
                });
                if (!keyStore) {
                    return {
                        code: 'xxxx',
                        message: 'Error creating publicKey',
                    }
                }
                //create token pair
                const tokens = await createTokenPair({ userId: newShop._id }, publicKey, privateKey);
                console.log("Created Token Sucessfully::", tokens);

                return {
                    code: 201,
                    metadata: {
                        shop: getIntoData({
                            fileds: ['_id', 'name', 'email'],
                            object: newShop
                        }),
                        tokens
                    }
                }
            }
        }
        catch (error) {
            return {
                code: 200,
                message: error.message,
                status: 'error',
            }
        }
    }
}
module.exports = AccessService;