import { prisma } from '../../../../prisma/prisma.js'
import type { Users } from '../../../generated/prisma/index.js'

export class PostgresDeleteUserRepository {
    async execute(userId: string): Promise<Users | null> {
        try {
            return await prisma.users.delete({
                where: {
                    id: userId,
                },
            })
        } catch (error) {
            console.error(error)
            return null
        }
    }
}
