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
// passa o update com partial do create, ou seja, transforma tudo do create em opcional. Se passar uma propriedade, ele aciona o zod do create
// Passa o update com um strickObject, passando o createUserSchema com os campos não obrigatórios e o shape, caso o retorno do shape for algum campo invalido, ele retorna a mensagem de erro
export const updateUserSchema = z.strictObject(
    createUserSchema.partial().shape,
    'Some provided field is not allowed.',
)
