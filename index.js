const Hapi = require('hapi');
// const mysql = require('mysql');

const server = new  Hapi.Server();
server.connection({port: 3000, host: '0.0.0.0'}); // needed for digital ocean.

server.register(require('inert'), (err) => {

    if (err) {
        throw err;
    }

    server.route({
        method: 'GET',
        path: '/home',
        handler: function (request, reply) {
            reply.file('./public/index.html');
        }
    });

    server.route({
        method: 'GET',
        path: '/jquery-3.3.1.min.js',
        handler: function (request, reply) {
            reply.file('./public/JS/libs/jquery-3.2.1.min.js');
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


// server.route({
//     method: 'GET',
//     path: '',
//     handler: function(request, reply){
//         // .header("Access-Control-Allow-Origin", "*")
//         reply('Hello, ' + "jenna" + '!');
//     }
// });

server.route({
    method: 'POST',
    path: '/{longitude}/{latitude}/{words}/{free}',
    handler: function(request, reply){
        reply('Hello2, ' + encodeURIComponent(request.params.longitude) + "," + encodeURIComponent(request.params.latitude) + "," + encodeURIComponent(request.params.words) + "," + encodeURIComponent(request.params.free) + '!');
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
