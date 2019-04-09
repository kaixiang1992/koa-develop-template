const network = {
    env: process.env.NODE_ENV || 'develop',
    protocol: process.env.protocol || 'http',
    host: process.env.host || '127.0.0.1',
    port: process.env.port || 3000
}

module.exports = network;