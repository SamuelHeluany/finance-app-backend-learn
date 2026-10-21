import { prisma } from '../../../../prisma/prisma.js'

export class PostgresGetUserByIdRepository {
    // chama o helper para fazer o select por id dos usuários passando o userId
    async execute(userId) {
        return await prisma.users.findUnique({
            where: {
                id: userId,
            },
        })
    }
}
