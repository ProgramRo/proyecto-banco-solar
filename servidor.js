const http = require('http')
const url = require('url')
const fs = require('fs')

const { consultarTransferencias, hacerTransferencias, consultarUsuarios, crearUsuarios, actualizarUsuarios, eliminarUsuarios } = require('./consultas')

// Se crea el servidor con rutas
http.createServer( async(req, res) => {

    // Ruta para leer archivo HTML
    if(req.url ==='/' && req.method === 'GET') {
        try {
            res.setHeader('Content-Type', 'text/html')
            res.statusCode = 200
            res.end(fs.readFileSync('index.html', 'utf-8'))
        } catch (error) {
            res.statusCode = 500
            res.end(error.message)
        }
    }

    // Ruta para obtener registros de transferencias
    if(req.url === '/transferencias' && req.method === 'GET') {
        try {
            const registros = await consultarTransferencias()
            res.statusCode = 200
            res.end(JSON.stringify(registros))
        } catch (error) {
            res.statusCode = 500
            res.end(error.message)
        }
    }

    // Ruta para realizar transferencias
    if(req.url === '/transferencia' && req.method === 'POST') {
        try {
            let body = ''
            req.on('data', (chunk) => {
                body += chunk
            })
            req.on('end', async () => {
                const datos = JSON.parse(body)
                await hacerTransferencias(datos)
                res.statusCode = 201
                res.end(JSON.stringify({}))
            })
        } catch (error) {
            res.statusCode = 500
            res.end(error.message)
        }
    }

    // Ruta para crear nuevos usuarios
    if(req.url === '/usuario' && req.method === 'POST') {
        try {
            let body = ''
            req.on('data', (chunk) => {
                body += chunk
            })
            req.on('end', async () => {
                const datos = Object.values(JSON.parse(body))
                const respuesta = await crearUsuarios(datos)
                res.statusCode = 201
                res.end(JSON.stringify(respuesta))
            })
        } catch (error) {
            res.statusCode = 500
            res.end(error.message)
        }
    }

    // Ruta para obtener registros de usuarios
    if(req.url === '/usuarios' && req.method === 'GET') {
        try {
            const registros = await consultarUsuarios()
            res.statusCode = 200
            res.end(JSON.stringify(registros))
        } catch (error) {
            res.statusCode = 500
            res.end(error.message)
        }
    }

    // Ruta para actualizar registros de usuarios
    if(req.url.startsWith('/usuario') && req.method === 'PUT') {
        try {
            const { id } = url.parse(req.url, true).query
            let body = ''
            req.on('data', (chunk) => {
                body += chunk
            })
            req.on('end', async () => {
                const datos = JSON.parse(body)
                console.log(datos)
                const respuesta = await actualizarUsuarios(datos, id)
                res.statusCode = 200
                res.end(JSON.stringify(respuesta))
            })
        } catch (error) {
            res.statusCode = 500
            res.end(error.message)
        }
    }

    // Ruta para eliminar un usuario
    if(req.url.startsWith('/usuario') && req.method === 'DELETE') {
        try {
            const { id } = url.parse(req.url, true).query
            const respuesta = await eliminarUsuarios(id)
            res.statusCode = 200
            res.end(JSON.stringify(respuesta))
        } catch (error) {
            res.statusCode = 500
            res.end(error.message)
        }
    }

}).listen(3000, console.log('Server ON!'))