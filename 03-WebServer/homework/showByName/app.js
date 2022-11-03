var fs = require("fs")
var http = require("http")

// Escribí acá tu servidor
http
    .createServer(function (req, res) { // Creamos una serie de events listener, que van a escuchar por requests que ocurren en este socket

        fs.readFile(`${__dirname}/images/${req.url}.jpg`, (err, data) => {
            if (err) {
                res.writeHead(400, { 'Content-Type': 'text/plain' })
                res.end("Hubo un error");
            }
            else {
                res.writeHead(200, { 'Content-Type': 'image/jpg' })
                res.end(data);
            }
        });
    })
    .listen(3000, '127.0.0.1');
