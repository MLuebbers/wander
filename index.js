const Hapi = require('hapi');
// const mysql = require('mysql');

const server = new  Hapi.Server();
server.connection({port: 3000, host: '0.0.0.0'}); // needed for digital ocean.

// var mysql = require('mysql');
// var connection = mysql.createConnection({
//     host: '165.227.67.10:3000'
//     user: 'root'
//     password: 'password'
// })

server.register(require('inert'), (err) => {

    if (err) {
        throw err;
    }

    server.route({
        method: 'GET',
        path: '/test',
        handler: function (request, reply) {
            reply.file('./Test/test.html');
        }
    });

    server.route({
        method: 'GET',
        path: '/jquery-3.3.1.min.js',
        handler: function (request, reply) {
            reply.file('./Test/jquery-3.3.1.min.js');
        }
    });
});

server.route({
    method: 'GET',
    path: '/',
    handler: function(request, reply){
        if(encodeURIComponent(request.query.name)) {
            reply('Hello, ' + encodeURIComponent(request.query.name) + '!');
        } else {
            reply('Hello, world!');
        }
    }
});


server.route({
    method: 'POST',
    path: '/',
    handler: function(request, reply){
        reply('Longitude: ' + request.query.longitude + "," + 'Latitude: ' + request.query.latitude + "," + 'Words: ' + request.query.words + "," + 'Free: ' + request.query.free);

    });

server.route({
        method: 'GET',
        path: '/index',
        handler: function (request, reply) {
            reply.file('./public/.html');
        }
    });

server.start((err) => {
    if(err){
        throw err;
    }
    console.log(`Server running at: ${server.info.uri}`); // that's a back tick

});
