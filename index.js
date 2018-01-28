const Hapi = require('hapi');
const mysql = require('mysql');

const server = new  Hapi.Server();
server.connection({port: 3001, host: '0.0.0.0'}); // needed for digital ocean.

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'wander'
});

connection.connect(function(err) {
    if(err){
        console.error('error connecting: ' + err.stack);
        return;
    }

    console.log('connected as id ' + connection.threadId);

    // connection.query("CREATE DATABASE wander", function (err, result) {
    //     if (err) {
    //         throw err;
    //     }
    //     console.log("Database created");
    // });

    // var sql = "CREATE TABLE points (longitude FLOAT, latitude FLOAT, words VARCHAR(140), free BOOLEAN)";
    // connection.query(sql, function (err, result) {
    //     if (err) {
    //         throw err;
    //     }
    //     console.log("Table created");
    // });
});
server.register(require('inert'), (err) => {

    if (err) {
        throw err;
    }

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
            reply.file('./public/jquery-3.2.1.min.js');
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
        path: '/popup_script.js',
        handler: function (request, reply) {
            reply.file('./public/popup_script.js');
        }
    });

    // server.route({
    //     method: 'GET',
    //     path: '/jquery-3.3.1.min.js',
    //     handler: function (request, reply) {
    //         reply.file('./Test/jquery-3.3.1.min.js');
    //     }
    // });

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

server.start((err) => {
    if(err){
        throw err;
    }
    console.log(`Server running at: ${server.info.uri}`); // that's a back tick

});

// server.route({
//         method: 'GET',
//         path: '/test',
//         handler: function (request, reply) {
//             reply.file('./Test/test.html');
//         }
//     });


// server.route({
//         method: 'GET',
//         path: '/index',
//         handler: function (request, reply) {
//             reply.file('./public/.html');
//         }
//     });

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
        var lon = request.query.longitude
        var lat = request.query.latitude
        var words = request.query.words
        var free = request.query.free

        reply('The Values are || '
        + lon
        + " || " + lat
        + " || " + words
        + " || " + free + '!');

        // var sql = "INSERT INTO points (longitude, latitude, words, free) VALUES (@lon, @lat, @words, @free)";
        var sql = "INSERT INTO points (longitude, latitude, words, free) VALUES" + lon + ',' + lat + ',' + words + ',' + free;
        // var sql = "INSERT INTO points (longitude, latitude, words, free) VALUES (12.5, 25.2, 'duck duck goose', true)";
        // var sql = "INSERT INTO points (longitude, latitude, words, free) VALUES (27, 212, 'dudsfk duck msse', false)";
        connection.query(sql, function (err, result) {
        if (err) {
            throw err;
        }
            console.log("1 record inserted");
        });

        connection.query("SELECT * FROM points", function (err, result, fields) {
            if (err){
              throw err;
            }
            console.log(result);
        });
    }
});
