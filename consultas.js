const { Pool } = require('pg')

const config = {
    user: "postgres",
    host: "localhost",
    password: "1234",
    database: "bancosolar_db",
    port: 5432,
}

const pool = new Pool(config)

const consultar = async () => {
    try {
        const result = await pool.query('SELECT * FROM usuarios')
        return result.rows
    } catch (error) {
        console.log(error)
        return error
    }
}

module.exports = { consultar }