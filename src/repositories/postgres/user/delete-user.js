import { prisma } from '../../../../prisma/prisma.js'

export class PostgresDeleteUserRepository {
    async execute(userId) {
        return await prisma.users.delete({
            where: {
                id: userId,
            },
        })
    }
}
