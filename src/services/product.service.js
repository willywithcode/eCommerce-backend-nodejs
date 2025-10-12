'use strict'


const { BadRequestError } = require('../core/error.response')
const { product, clothing, electronic } = require('../models/product.model')

//define factory class to create product

class ProductFactory {
    // type: ['Clothing', 'Electronics']
    //payload: data from req.body
    static async createProduct(type, payload) {
        switch (type) {
            case 'Clothing':
                return new Clothing(payload).createProduct();
            case 'Electronics':
                return new Electronics(payload).createProduct();
            default:
                throw new BadRequestError(`Invalid product type ${type}`);
        }
    }
}

//define base product class

class Product {
    constructor({ product_name, product_thumb, product_description, product_price, product_quantity, product_type, product_shop, product_attributes }) {
        this.product_name = product_name
        this.product_thumb = product_thumb
        this.product_description = product_description
        this.product_price = product_price
        this.product_quantity = product_quantity
        this.product_type = product_type
        this.product_shop = product_shop
        this.product_attributes = product_attributes
    }

    async createProduct(product_id) {
        return await product.create({ ...this,_id: product_id });
    }
}


//define sub-class for different product types Clothing

class Clothing extends Product {
    async createProduct() {
        const newClothing = await clothing.create(this.product_attributes);
        if (!newClothing) throw new BadRequestError("Create new Clothing error");
        const newProduct = await super.createProduct();
        if (!newProduct) throw new BadRequestError("Create new Product error");
        return newProduct;
    }
}

//define sub-class for different product types Electronic

class Electronics extends Product {
    async createProduct() {
        const newElectronics = await electronic.create({
            ...this.product_attributes,
            product_shop: this.product_shop
        });
        if (!newElectronics) throw new BadRequestError("Create new Electronics error");
        const newProduct = await super.createProduct(newElectronics._id);
        if (!newProduct) throw new BadRequestError("Create new Product error");
        return newProduct;
    }
}

module.exports = ProductFactory;