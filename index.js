import 'dotenv/config'
import express from 'express'
import { PostgresHelper } from './src/db/postgres/helper.js'

const app = express()

app.get('/', async (req, res) => {
    // passa o helper e o select que você quer
    const results = await PostgresHelper.query('SELECT * FROM users')
    // resposta vem o select em JSON
    res.send(JSON.stringify(results))
})

app.listen(3000, () => {
    console.log('Listen on 3000 port!')
})
