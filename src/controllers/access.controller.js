'use strict'
class AccessController {
    signUp = async (req, res, next) => {
        try {
            console.log('[P]::signup::', req.body);
            return res.status(201).json({
                message: 'Signup success',
                code: 2001,
                metadat: { userId: 1 }
            });
        } catch (error) {
            next(error);
        }
    }
}

const accessController = new AccessController();
module.exports = { accessController };