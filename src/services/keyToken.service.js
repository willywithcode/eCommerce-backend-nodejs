'use strict'

const keytokenModel = require("../models/keytoken.model");
const { Type } = require("mongoose");
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

    static findByUserId = async (userId) => {
        return await keytokenModel.findOne({user: Type.ObjectId(userId)}).lean();
    }
    static removeKeyById = async (id) => {
        return await keytokenModel.remove(id);
    }
    
}
module.exports = KeyTokenService;