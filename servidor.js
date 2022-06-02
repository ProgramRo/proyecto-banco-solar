const http = require('http')
const url = require('url')
const fs = require('fs')

const { consultarTransferencias, consultarUsuarios, crearUsuarios, actualizarUsuarios, eliminarUsuarios } = require('./consultas')

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

    // Ruta para crear nuevos usuarios
    if(req.url === '/usuario' && req.method === 'POST') {
        let body = ''
        req.on('data', (chunk) => {
            body += chunk
        })
        req.on('end', async () => {
            const datos = Object.values(JSON.parse(body))
            const respuesta = await crearUsuarios(datos)
            res.end(JSON.stringify(respuesta))
        })
    }

    // Ruta para obtener registros de usuarios
    if(req.url === '/usuarios' && req.method === 'GET') {
        const registros = await consultarUsuarios()
        res.end(JSON.stringify(registros))
    }

    // Ruta para actualizar registros de usuarios
    if(req.url.startsWith('/usuario') && req.method === 'PUT') {
        const { id } = url.parse(req.url, true).query
        let body = ''
        req.on('data', (chunk) => {
            body += chunk
        })
        req.on('end', async () => {
            const datos = JSON.parse(body)
            console.log(datos)
            const respuesta = await actualizarUsuarios(datos, id)
            res.end(JSON.stringify(respuesta))
        })
    }

    // Ruta para eliminar un usuario
    if(req.url.startsWith('/usuario') && req.method === 'DELETE') {
        const { id } = url.parse(req.url, true).query
        const respuesta = await eliminarUsuarios(id)
        res.end(JSON.stringify(respuesta))
    }

}).listen(3000, console.log('Server ON!'))