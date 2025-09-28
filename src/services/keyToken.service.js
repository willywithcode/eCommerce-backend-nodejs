'use strict'

const keytokenModel = require("../models/keytoken.model");

class KeyTokenService {
    static createKeyToken = async ({ userId, publicKey, privateKey, refreshToken }) => {
        try {
            // const token = await keytokenModel.create({
            //     user: userId,
            //     publicKey,
            //     privateKey
            // })
            // return token ? token.publicKey : null;
            const filter = { user: userId}, update = {
                publicKey, privateKey, refreshTokensUsed: [], refreshToken
            }, options = { upsert: true, new: true };

            const tokens = await keytokenModel.findOneAndUpdate(
                filter, update, options
            );
            return tokens ? tokens.publicKey : null;
        } catch (error) {
            throw error;
        }
    }
}
module.exports = KeyTokenService;