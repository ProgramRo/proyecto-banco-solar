const http = require('http')
const fs = require('fs')

// Se crea el servidor con rutas
http.createServer((req, res) => {

    // Ruta para leer archivo HTML
    if(req.url ==='/' && req.method === 'GET') {
        res.setHeader('Content-Type', 'text/html')
        res.end(fs.readFileSync('index.html', 'utf-8'))
    }

}).listen(3000, console.log('Server ON!'))