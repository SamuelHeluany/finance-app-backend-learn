import 'dotenv/config.js'
import fs from 'fs'
import { pool } from '../helper.js'
import path from 'path'
import { fileURLToPath } from 'url'

// Aqui precisa do dirname que só tem no COMMONJS, mas no MODULES tem que usar esse "atalho"
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const execMigrations = async () => {
    // conecta a pool
    const client = await pool.connect()
    try {
        // da um filter em todos os arquivos que terminam em .sql
        const files = fs
            .readdirSync(__dirname)
            .filter((file) => file.endsWith('.sql'))

        for (const file of files) {
            // acha o arquivo sql
            const filePath = path.join(__dirname, file)
            // executa o arquivo sql
            const script = fs.readFileSync(filePath, 'utf-8')
            // executa a query
            await client.query(script)
            console.log('Migrations executed successfully!')
        }
    } catch (error) {
        console.error(error)
    } finally {
        // devolve o client pra pool
        await client.release()
    }
}

execMigrations()
