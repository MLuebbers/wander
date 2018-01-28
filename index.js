const Hapi = require('hapi');
// const mysql = require('mysql');

const server = new  Hapi.Server();
server.connection({port: 3000, host: '0.0.0.0'}); // needed for digital ocean.

server.route({
    method: 'GET',
    path: '/',
    handler: function(request, reply){
        reply('Hello, world!');
    }
});


server.route({
    method: 'GET',
    path: '/{name}',
    handler: function(request, reply){
        reply('Hello, ' + encodeURIComponent(request.params.name) + '!').header("Access-Control-Allow-Origin", "*");
    }
});

server.route({
    method: 'POST',
    path: '/{longitude}/{latitude}/{words}/{free}',
    handler: function(request, reply){
        reply('Hello2, ' + encodeURIComponent(request.params.longitude) + "," + encodeURIComponent(request.params.latitude) + "," + encodeURIComponent(request.params.words) + "," + encodeURIComponent(request.params.free)'!');
    }
});

server.start((err) => {
    if(err){
        throw err;
    }
    console.log(`Server running at: ${server.info.uri}`); // that's a back tick

});
