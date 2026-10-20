// cria o schema do zod
import z from 'zod'

export const createUserSchema = z.object({
    first_name: z.string().trim().min(1, {
        message: 'First name is required. ',
    }),
    last_name: z.string().trim().min(1, {
        message: 'Last name is required. ',
    }),
    email: z
        .string()
        .email({ message: 'Please, provide a valid email.' })
        .trim(),
    password: z.string().trim().min(6, {
        message: 'Password must have at least 6 characters.',
    }),
})
