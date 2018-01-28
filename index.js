const Hapi = require('hapi');
const mysql = require('mysql');

const server = new  Hapi.Server();
server.connection({port: 3000, host: '0.0.0.0'}); // needed for digital ocean.

const connection = mysql.createConnection({
    host: '165.227.67.10:3000',
    user: 'root',
    password: 'password',
    database: 'points'
});

connection.connect(function(err) {
    if(err){
        console.error('error connecting: ' + err.stack);
        return;
    }

    console.log('connected as id ' + connection.threadId);
});

server.register(require('inert'), (err) => {

    if (err) {
        throw err;
    }

    // server.route({
    //     method: 'GET',
    //     path: '/{param*}',
    //     handler: {
    //         directory: {
    //             path: './public'
    //         }
    //     }
    // });

    server.route({
        method: 'GET',
        path: '/home',
        handler: function (request, reply) {
            // reply('Hello, world!');
            reply.file('./public/index.html');
        }
    });

    server.route({
        method: 'GET',
        path: '/jquery-3.2.1.min.js',
        handler: function (request, reply) {
            reply.file('./public/JS/libs/jquery-3.2.1.min.js');
        }
    });

    server.route({
        method: 'GET',
        path: '/jquery-3.3.1.min.js',
        handler: function (request, reply) {
            reply.file('./Test/jquery-3.3.1.min.js');
        }
    });

    server.route({
        method: 'GET',
        path: '/main.css',
        handler: function (request, reply) {
            reply.file('./public/main.css');
        }
    });

    server.route({
        method: 'GET',
        path: '/map_script.js',
        handler: function (request, reply) {
            reply.file('./public/map_script.js');
        }
    });

    server.route({
        method: 'GET',
        path: '/script.js',
        handler: function (request, reply) {
            reply.file('./public/script.js');
        }
    });


});

server.route({
        method: 'GET',
        path: '/test',
        handler: function (request, reply) {
            reply.file('./Test/test.html');
        }
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

// server.route({
//     method: 'GET',
//     path: '/',
//     handler: function(request, reply){
//         if(encodeURIComponent(request.query.name)) {
//             reply('Hello, ' + encodeURIComponent(request.query.name) + '!');
//         } else {
//             reply('Hello, world!');
//         }
//     }
// });


// server.route({
//     method: 'GET',
//     path: '',
//     handler: function(request, reply){
//         // .header("Access-Control-Allow-Origin", "*")
//         reply('Hello, ' + "jenna" + '!');
//     }
// });

server.route({
    method: 'GET',
    path: '/',
    handler: function(request, reply){
        reply('Hello2, '
        + request.query.longitude
        + "," + request.query.latitude
        + "," + request.query.words
        + "," + request.query.free + '!');
    }
});
