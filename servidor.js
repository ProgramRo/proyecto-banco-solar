const http = require('http')
const url = require('url')
const fs = require('fs')

const { consultarTransferencias, consultarUsuarios, eliminarUsuarios } = require('./consultas')

// Se crea el servidor con rutas
http.createServer( async(req, res) => {

    // Ruta para leer archivo HTML
    if(req.url ==='/' && req.method === 'GET') {
        res.setHeader('Content-Type', 'text/html')
        res.end(fs.readFileSync('index.html', 'utf-8'))
    }

    // Ruta para obtener registros de transferencias
    if(req.url === '/transferencias' && req.method === 'GET') {
        const registros = await consultarTransferencias()
        res.end(JSON.stringify(registros))
    }

    // Ruta para obtener registros de usuarios
    if(req.url === '/usuarios' && req.method === 'GET') {
        const registros = await consultarUsuarios()
        res.end(JSON.stringify(registros))
    }

    // Ruta para eliminar un usuario
    if(req.url.startsWith('/usuario') && req.method === 'DELETE') {
        const { id } = url.parse(req.url, true).query
        const respuesta = await eliminarUsuarios(id)
        res.end(JSON.stringify(respuesta))
    }

}).listen(3000, console.log('Server ON!'))