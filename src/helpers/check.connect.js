'use strict';
const mongoose = require('mongoose');
const os = require('os');
const process = require('process');
const _SECOND = 5000;

//count number of connections
const countConnect = () => {
    const numConnection = mongoose.connections.length;
    console.log(`Number of connections: ${numConnection}`);
}

//check overload
const checkOverload = () => {
    setInterval(() => {
        const numConnection = mongoose.connections.length;
        const numCores = os.cpus().length;
        const memoryUsage = process.memoryUsage().rss ;//in bytes

        //Example maximum of connections base on number of cores
        const maxConnections = numCores * 5;

        console.log('Active connections: ', numConnection);
        console.log('Memory usage (RSS): ', (memoryUsage / (1024 * 1024)).toFixed(2), 'MB');
        
        if (numConnection > maxConnections) {
            console.log(`Overload detected! Connections: ${numConnection}, Max: ${maxConnections}`);
            // Here you can implement logic to handle overload, e.g., close some connections or alert admin
        }

        
    }, _SECOND); //Monitor every 5 seconds
}

module.exports = { countConnect, checkOverload };
