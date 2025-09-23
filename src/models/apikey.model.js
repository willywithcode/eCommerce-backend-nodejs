'user strict';

const { defaults } = require('lodash');
const {model, Schema, Types} = require('mongoose');


const DOCUMENT_NAME = 'ApiKey';
const COLLECTION_NAME = 'ApiKeys';

const apiKeySchema = new Schema({
    key: {
        type: String,
        required: true,
        unique: true
    },
    status: {
        type: Boolean,
        default: true
    },
    permissions: {
        type: [String],
        required: true,
        enum: ['0000', '1111', '2222']
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: '30d'
    }
}, {
    collection: COLLECTION_NAME,
    timestamps: true
});

module.exports = model(DOCUMENT_NAME, apiKeySchema);
