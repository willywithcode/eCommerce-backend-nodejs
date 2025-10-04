'use strict'

const { SuccessResponse } = require("../core/success.response");

class ProductController {
    createProduct = async (req, res, next) => {
        new SuccessResponse({
            message: 'Create new product success!',
            metadata: await ProductFactory.createProduct(req.body.product_type, req.body).createProduct()
        }).send(res)
    }
}

module.exports = new ProductController();