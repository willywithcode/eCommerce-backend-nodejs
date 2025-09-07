'use strict'

const mongoose = require('mongoose');

const connectString = 'mongodb://localhost:27017/shopDEV';

class Database  {
    constructor() {
        this.connect();
    }

    //connect to mongodb
    connect(type = 'mongodb') {
        if(1 === 1) {
            mongoose.set('debug', true);
            mongoose.set('debug', { color: true });
        }
        mongoose.connect(connectString, {
            maxPoolSize: 50, // Maintain up to 50 socket connections
        }).then(_ => console.log('MongoDB connected'))
        .catch(err => console.log("MongoDB connection error: ", err));
    }

    static getInstance() {
        if(!Database.instance) {
            Database.instance = new Database();
        }
        return Database.instance;
    }
}

const instanceMongo = Database.getInstance();

module.exports = instanceMongo;