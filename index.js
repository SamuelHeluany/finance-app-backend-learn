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
import { PostgresCreateUserRepository } from './src/repositories/postgres/create-user.js'
import { GetUserByIdUseCase } from './src/use-cases/get-user-by-id.js'
import { CreateUserUseCase } from './src/use-cases/create-user.js'
import { PostgresUpdateUserRepository } from './src/repositories/postgres/update-user.js'
import { UpdateUserUseCase } from './src/use-cases/update-user.js'
import { PostgresDeleteUserRepository } from './src/repositories/postgres/delete-user.js'
import { DeleteUserUseCase } from './src/use-cases/delete-user.js'
import { PostgresGetUserByEmailRepository } from './src/repositories/postgres/get-user-by-email.js'

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

// update user by id
app.patch('/api/users/:userId', async (req, res) => {
    // passa repository normalmente(que não depende de ninguem)
    const updateUserRepository = new PostgresUpdateUserRepository()
    // passa o use case chamando o repository, pois o usecase depende do repository
    const updateUserUseCase = new UpdateUserUseCase(updateUserRepository)
    // passa o controller chamando o usecase, pois o controller depende do usecase
    const updateUserController = new UpdateUserController(updateUserUseCase)
    // desestrutura o controller e executa passando a request
    const { statusCode, body } = await updateUserController.execute(req)
    // envia pro usuario a resposta com statusCode e o body
    res.status(statusCode).send(body)
})

// create user
app.post('/api/users', async (req, res) => {
    const getUserByEmailRepository = new PostgresGetUserByEmailRepository()
    // passa repository normalmente(que não depende de ninguem)
    const createUserRepository = new PostgresCreateUserRepository()
    // passa o use case chamando o repository, pois o usecase depende do repository
    const createUserUseCase = new CreateUserUseCase(
        getUserByEmailRepository,
        createUserRepository,
    )
    // passa o controller chamando o usecase, pois o controller depende do usecase
    const createUserController = new CreateUserController(createUserUseCase)
    // executo ele com o req, porque é um httpRequest e uso o desestruturação passando o statusCode e body de resposta
    const { statusCode, body } = await createUserController.execute(req)
    // Passo a resposta com o status code e o body.
    res.status(statusCode).send(body)
})

// delete user
app.delete('/api/users/:userId', async (req, res) => {
    // passa repository normalmente(que não depende de ninguem)
    const deleteUserRepository = new PostgresDeleteUserRepository()
    // passa o use case chamando o repository, pois o usecase depende do repository
    const deleteUserUseCase = new DeleteUserUseCase(deleteUserRepository)
    // passa o controller chamando o usecase, pois o controller depende do usecase
    const deleteUserController = new DeleteUserController(deleteUserUseCase)

    const { statusCode, body } = await deleteUserController.execute(req)

    res.status(statusCode).send(body)
})

app.listen(process.env.PORT, () => {
    console.log(`Listen on port ${process.env.PORT}`)
})
