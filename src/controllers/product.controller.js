'use strict'

const { SuccessResponse } = require("../core/success.response");
const { product } = require("../models/product.model");
const ProductFactory = require("../services/product.service");

class ProductController {
    createProduct = async (req, res, next) => {
        new SuccessResponse({
            message: 'Create new product success!',
            metadata: await ProductFactory.createProduct(req.body.product_type, {
                ...req.body,
                product_shop: req.user.userId
            })
        }).send(res)
    }
}

module.exports = new ProductController();