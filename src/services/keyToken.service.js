'use strict'

const keytokenModel = require("../models/keytoken.model");

class KeyTokenService {
    static createKeyToken = async ({ userId, publicKey, privateKey }) => {
        try {
            const token = await keytokenModel.create({
                user: userId,
                publicKey,
                privateKey
            })
            return token ? token.publicKey : null;
        } catch (error) {
            throw error;
        }
    }
}
module.exports = KeyTokenService;