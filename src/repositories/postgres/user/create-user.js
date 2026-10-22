import { prisma } from '../../../../prisma/prisma.js'
export class PostgresCreateUserRepository {
    async execute(createUserParams) {
        const user = await prisma.users.create({
            data: createUserParams,
        })
        return user
    }
}
