'use strict';

const Hapi = require('hapi');
const MySQL = require('mysql');
const Joi = require('joi');
//const Bcrypt = require('bcrypt');
// Create a server with a host and port
const init = async () => {

    const server = Hapi.server({
        port: 3000,
        host: 'localhost'
    });

const connection = MySQL.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'satya'
});
console.log(connection);
connection.connect();

server.route({
    method: 'GET',
    path: '/',
    handler: function (request, reply) {
        return 'hello world1';
    }
});
server.route({
    method: 'GET',
    path: '/users',
    handler: function (request, reply) {

        connection.query('SELECT uid, username FROM users', function (error, results, fields) {
            if (error) throw error;
            console.log(results);
            reply(results);
        });

    }
});

server.start();
console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {

console.log(err);
process.exit(1);
});

init();