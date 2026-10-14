import 'dotenv/config'
import express from 'express'
import { PostgresHelper } from './src/db/postgres/helper.js'
import {
    CreateUserController,
    DeleteUserController,
    GetUserByIdController,
    UpdateUserController,
} from './src/controllers/index.js'
import { PostgresGetUserByIdRepository } from './src/repositories/postgres/get-user-by-id.js'
import { GetUserByIdUseCase } from './src/use-cases/get-user-by-id.js'

const app = express()

app.use(express.json())

app.get('/', async (req, res) => {
    // passa o helper e o select que você quer
    const results = await PostgresHelper.query('SELECT * FROM users')
    // resposta vem o select em JSON
    res.send(JSON.stringify(results))
})

// get dos usuários por id
app.get('/api/users/:userId', async (req, res) => {
    // Agora com a injeção de dependencia feita no userById

    // passa repository normalmente(que não depende de ninguem)
    const getUserByIdRepository = new PostgresGetUserByIdRepository()
    // passa o use case chamando o repository, pois o usecase depende do repository
    const getUserByIdUseCase = new GetUserByIdUseCase(getUserByIdRepository)
    // passa o controller chamando o usecase, pois o controller depende do usecase
    const getUserByIdController = new GetUserByIdController(getUserByIdUseCase)
    // desestrutura o controller e executa passando a request
    const { statusCode, body } = await getUserByIdController.execute(req)
    // envia pro usuario a resposta com statusCode e o body
    res.status(statusCode).send(body)
})

app.patch('/api/users/:userId', async (req, res) => {
    // passa o controller
    const updateUserController = new UpdateUserController()

    // desestrutura o controller e executa passando a request
    const { statusCode, body } = await updateUserController.execute(req)

    // envia pro usuario a resposta com statusCode e o body
    res.status(statusCode).send(body)
})

app.post('/api/users', async (req, res) => {
    // pego o controller que valida a requisição (campos obrigatórios, tamanho de senha e email)
    const createUserController = new CreateUserController()
    // executo ele com o req, porque é um httpRequest e uso o desestruturo passando o statusCode e body de resposta
    const { statusCode, body } = await createUserController.execute(req)
    // Passo a resposta com o status code e o body.
    res.status(statusCode).send(body)
})

app.delete('/api/users/:userId', async (req, res) => {
    const deleteUserController = new DeleteUserController()

    const { statusCode, body } = await deleteUserController.execute(req)

    res.status(statusCode).send(body)
})

app.listen(process.env.PORT, () => {
    console.log(`Listen on port ${process.env.PORT}`)
})
