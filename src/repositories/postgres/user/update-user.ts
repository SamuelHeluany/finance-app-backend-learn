import { prisma } from '../../../../prisma/prisma.js'
import type { Prisma, Users } from '../../../generated/prisma/index.js'

interface UpdateUserRepositoryParams {
    userId: string
    updateUserParams: Prisma.UsersUpdateInput
}
export class PostgresUpdateUserRepository {
    async execute({
        userId,
        updateUserParams,
    }: UpdateUserRepositoryParams): Promise<Users> {
        // Passa o id de quem quer atualizar e depois no data passa o que quer atualizar
        return await prisma.users.update({
            where: {
                id: userId,
            },
            data: updateUserParams,
        })
    }
}
