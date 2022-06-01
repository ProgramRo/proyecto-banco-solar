const http = require('http')
const fs = require('fs')

const { consultar } = require('./consultas')

// Se crea el servidor con rutas
http.createServer( async(req, res) => {

    // Ruta para leer archivo HTML
    if(req.url ==='/' && req.method === 'GET') {
        res.setHeader('Content-Type', 'text/html')
        res.end(fs.readFileSync('index.html', 'utf-8'))
    }

    // Ruta para obtener registros
    if(req.url === '/usuarios' && req.method === 'GET') {
        const registros = await consultar()
        res.end(JSON.stringify(registros))
    }

}).listen(3000, console.log('Server ON!'))