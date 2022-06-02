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
        text: 'SELECT * FROM transferencias',
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
        console.log(result)
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

module.exports = { consultarTransferencias, consultarUsuarios, crearUsuarios, actualizarUsuarios, eliminarUsuarios }