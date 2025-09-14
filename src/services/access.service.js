'use strict'

const shopModel = require('../models/shop.model');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const RolesShop = {
    SHOP: "SHOP",
    WRITER: "WRITER",
    EDIT: 'EDIT',
    ADMIN: 'ADMIN',
}


class AccessController {
    static signUp = async ({name, email, password}) => {
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
                //created privatekey, publickey 
                const { privateKey, publicKey} = crypto.generateKeyPairSync('rsa',  {
                    modulusLength: 4096,
                })
                console.log({privateKey, publicKey}); // save db
            }
        }
        catch (error) {
            return {
                code: 'xxxx',
                message: error.message,
                status: 'error',
            }
        }
    }
}