import {
    CreateUserController,
    DeleteUserController,
    GetUserBalanceController,
    GetUserByIdController,
    UpdateUserController,
} from '../../controllers/index.js'
import {
    PostgresCreateUserRepository,
    PostgresDeleteUserRepository,
    PostgresGetUserBalanceRepository,
    PostgresGetUserByEmailRepository,
    PostgresGetUserByIdRepository,
    PostgresUpdateUserRepository,
} from '../../repositories/postgres/index.js'
import {
    CreateUserUseCase,
    DeleteUserUseCase,
    GetUserBalanceUseCase,
    GetUserByIdUseCase,
    UpdateUserUseCase,
} from '../../use-cases/index.js'

// Aqui vão ter todas as factories relacionadas ao usuário
// Todas as camadas relacionadas ao usuário, dentro de cada função respectiva e passa a função no index

export const makeGetUserByIdController = () => {
    // Agora com a injeção de dependencia feita no userById

    // passa repository normalmente(que não depende de ninguem)
    const getUserByIdRepository = new PostgresGetUserByIdRepository()
    // passa o use case chamando o repository, pois o usecase depende do repository
    const getUserByIdUseCase = new GetUserByIdUseCase(getUserByIdRepository)
    // passa o controller chamando o usecase, pois o controller depende do usecase
    const getUserByIdController = new GetUserByIdController(getUserByIdUseCase)

    return getUserByIdController
}

export const makeCreateUserController = () => {
    // passa repository normalmente(que não depende de ninguem)
    const getUserByEmailRepository = new PostgresGetUserByEmailRepository()
    const createUserRepository = new PostgresCreateUserRepository()
    // passa o use case chamando o repository, pois o usecase depende do repository
    const createUserUseCase = new CreateUserUseCase(
        getUserByEmailRepository,
        createUserRepository,
    )
    // passa o controller chamando o usecase, pois o controller depende do usecase
    const createUserController = new CreateUserController(createUserUseCase)

    return createUserController
}

export const makeUpdateUserController = () => {
    // passa repository normalmente(que não depende de ninguem)
    const getUserByIdRepository = new PostgresGetUserByIdRepository()
    const getUserByEmailRepository = new PostgresGetUserByEmailRepository()
    const updateUserRepository = new PostgresUpdateUserRepository()
    // passa o use case chamando o repository, pois o usecase depende do repository
    const updateUserUseCase = new UpdateUserUseCase(
        getUserByIdRepository,
        getUserByEmailRepository,
        updateUserRepository,
    )
    // passa o controller chamando o usecase, pois o controller depende do usecase
    const updateUserController = new UpdateUserController(updateUserUseCase)

    return updateUserController
}

export const makeDeleteUserController = () => {
    // passa repository normalmente(que não depende de ninguem)
    const deleteUserRepository = new PostgresDeleteUserRepository()
    // passa o use case chamando o repository, pois o usecase depende do repository
    const deleteUserUseCase = new DeleteUserUseCase(deleteUserRepository)
    // passa o controller chamando o usecase, pois o controller depende do usecase
    const deleteUserController = new DeleteUserController(deleteUserUseCase)

    return deleteUserController
}

export const makeGetUserBalanceController = () => {
    const getUserBalanceRepository = new PostgresGetUserBalanceRepository()
    const getUserByIdRepository = new PostgresGetUserByIdRepository()

    const getUserBalanceUseCase = new GetUserBalanceUseCase(
        getUserBalanceRepository,
        getUserByIdRepository,
    )

    const getUserBalanceController = new GetUserBalanceController(
        getUserBalanceUseCase,
    )

    return getUserBalanceController
}
