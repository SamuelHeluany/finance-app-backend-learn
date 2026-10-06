import pg from 'pg'

const { Pool } = pg

export const pool = new Pool({
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    port: process.env.POSTGRES_PORT,
    database: process.env.POSTGRES_DB,
    host: process.env.POSTGRES_HOST,
})

export const PostgresHelper = {
    // cria a função query
    query: async (query, params) => {
        // conecta a piscina
        const client = await pool.connect()
        // cria a results passando os parametros
        const results = await client.query(query, params)
        // Ele coloca o cliente novamente na "piscina", usou o cliente e depois não quer mais ele
        await client.release()
        // retorna as linhas
        return results.rows
    },
}
