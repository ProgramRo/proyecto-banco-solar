const { Pool } = require('pg')

const config = {
    user: "postgres",
    host: "localhost",
    password: "1234",
    database: "bancosolar_db",
    port: 5432,
}

const pool = new Pool(config)

const consultarTransferencias = async () => {
    const SQLQuery = {
        text: 'SELECT t.id, us.nombre AS emisor, usu.nombre AS receptor, t.monto, t.fecha FROM transferencias t INNER JOIN usuarios us ON t.emisor = us.id INNER JOIN usuarios usu ON t.receptor = usu.id',
        rowMode: 'array'
    }
    try {
        const result = await pool.query(SQLQuery)
        return result.rows
    } catch (error) {
        console.log(error)
        return error
    }
}

const hacerTransferencias = async (datos) => {
    const descontar = {
        text: 'UPDATE usuarios SET balance = balance - $1 WHERE id = $2 RETURNING *',
        values: [datos.monto, datos.emisor],
    }
    const acreditar = {
        text: 'UPDATE usuarios SET balance = balance + $1 WHERE id = $2 RETURNING *',
        values: [datos.monto, datos.receptor],
    }
    pool.connect( async(errorConexion, client, release) => {
        try {
            await client.query('BEGIN')
            const descuento = await client.query(descontar)
            const acreditacion = await client.query(acreditar)

            console.log('Descuento en:', descuento.rows[0])
            console.log('Descuento en:', acreditacion.rows[0])

            await client.query('COMMIT')
        } catch (error) {
            await client.query('ROLLBACK')
            console.log(error)
            return error
        }
    })
}

const consultarUsuarios = async () => {
    try {
        const result = await pool.query('SELECT * FROM usuarios')
        return result.rows
    } catch (error) {
        console.log(error)
        return error
    }
}

const crearUsuarios = async (datos) => {
    const SQLQuery = {
        text: 'INSERT INTO usuarios(nombre, balance) VALUES($1, $2) RETURNING *',
        values: datos,
    }
    try {
        const result = await pool.query(SQLQuery)
        return result
    } catch (error) {
        console.log(error)
        return error
    }
}

const actualizarUsuarios = async (datos, id) => {
    const SQLQuery = {
        text: 'UPDATE usuarios SET nombre=$1, balance=$2 WHERE id=$3',
        values: [datos.name, datos.balance, id],
    }
    try {
        const result = await pool.query(SQLQuery)
        return result
    } catch (error) {
        console.log(error)
        return error
    }
}

const eliminarUsuarios = async (id) => {
    const SQLQuery = {
        text: 'DELETE FROM usuarios WHERE id=$1',
        values: [id],
    }
    try {
        const result = await pool.query(SQLQuery)
        return result.rows
    } catch (error) {
        console.log(error)
        return error
    }
}


module.exports = { consultarTransferencias, hacerTransferencias, consultarUsuarios, crearUsuarios, actualizarUsuarios, eliminarUsuarios }