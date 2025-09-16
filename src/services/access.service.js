'use strict'

const shopModel = require('../models/shop.model');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const KeyTokenService = require('./keyToken.service');
const { createTokenPair } = require('../auth/authUtils');
const { type } = require('os');
const { getIntoData } = require('../utils');
const RolesShop = {
    SHOP: "SHOP",
    WRITER: "WRITER",
    EDIT: 'EDIT',
    ADMIN: 'ADMIN',
}


class AccessService {
    static signUp = async ({ name, email, password }) => {
        try {
            // check email exist

            const holderShop = await shopModel.findOne({ email }).lean();
            if (holderShop) {
                return {
                    code: 'xxxx',
                    message: 'Email already registered',
                    metadata: null
                }
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