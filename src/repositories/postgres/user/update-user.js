import { prisma } from '../../../../prisma/prisma.js'

export class PostgresUpdateUserRepository {
    async execute(userId, updateUserParams) {
        // Passa o id de quem quer atualizar e depois no data passa o que quer atualizar
        return await prisma.users.update({
            where: {
                id: userId,
            },
            data: updateUserParams,
        })
    }
}
