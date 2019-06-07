const Hapi = require('@hapi/hapi');
const mysql = require('mysql');
require('dotenv').config();
const init = async () => {
    const server = Hapi.server({
        port: 3000,
        host: 'localhost'
    });

    server.route({
        method:"GET",
        path:"/api/books",
        handler:(request,reply)=>{
    
            return new Promise((resolve,reject)=>{
                var connection = mysql.createConnection({
                    host     : process.env.DB_HOST,
                    user     : process.env.DB_USER,
                    password : process.env.DB_PASSWORD,
                    database : process.env.DB_NAME
                  });
                  connection.connect();
         
                  connection.query('SELECT * from Books', function (error, books, fields) {
                    if (error) reject(error);
                    resolve(books);
                  });
                   
                  connection.end();
            })
            
        }
    })
    await server.start();
    console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});

init();