import 'dotenv/config'
import express from 'express'
import {
    makeCreateUserController,
    makeDeleteUserController,
    makeGetUserByIdController,
    makeUpdateUserController,
} from './src/factories/controllers/user.js'
import {
    makeCreateTransactionController,
    makeGetTransactionsByUserIdController,
    makeUpdateTransactionController,
} from './src/factories/controllers/transaction.js'

const app = express()
app.use(express.json())

// get dos usuários por id
app.get('/api/users/:userId', async (req, res) => {
    // Passa o factory pattern
    const getUserByIdController = makeGetUserByIdController()
    // desestrutura o controller e executa passando a request
    const { statusCode, body } = await getUserByIdController.execute(req)
    // envia pro usuario a resposta com statusCode e o body
    res.status(statusCode).send(body)
})

// update user by id
app.patch('/api/users/:userId', async (req, res) => {
    // Passa o factory pattern
    const updateUserController = makeUpdateUserController()
    // desestrutura o controller e executa passando a request
    const { statusCode, body } = await updateUserController.execute(req)
    // envia pro usuario a resposta com statusCode e o body
    res.status(statusCode).send(body)
})

// create user
app.post('/api/users', async (req, res) => {
    // Passa o factory pattern
    const createUserController = makeCreateUserController()
    // executo ele com o req, porque é um httpRequest e uso o desestruturação passando o statusCode e body de resposta
    const { statusCode, body } = await createUserController.execute(req)
    // Passo a resposta com o status code e o body.
    res.status(statusCode).send(body)
})

// delete user
app.delete('/api/users/:userId', async (req, res) => {
    // Passa o factory pattern
    const deleteUserController = makeDeleteUserController()
    const { statusCode, body } = await deleteUserController.execute(req)
    res.status(statusCode).send(body)
})

// Get transactons by user id
app.get('/api/transactions', async (req, res) => {
    const getTransactionsByUserIdController =
        makeGetTransactionsByUserIdController()

    const { statusCode, body } =
        await getTransactionsByUserIdController.execute(req)
    res.status(statusCode).send(body)
})

// Create Transactions
app.post('/api/transactions', async (req, res) => {
    const createTransactionController = makeCreateTransactionController()

    const { statusCode, body } = await createTransactionController.execute(req)

    res.status(statusCode).send(body)
})
// update transaction by transactionId
app.patch('/api/transactions/:transactionId', async (req, res) => {
    const updateTransactionController = makeUpdateTransactionController()

    const { statusCode, body } = await updateTransactionController.execute(req)

    res.status(statusCode).send(body)
})

app.listen(process.env.PORT, () => {
    console.log(`Listen on port ${process.env.PORT}`)
})
