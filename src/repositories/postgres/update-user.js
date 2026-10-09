import { PostgresHelper } from '../../db/postgres/helper'

export class PostgresUpdateUserRepository {
    // passa o id do usuário, e atualiza os parametros necessários (email, first_name, last_name, password)
    async execute(userId, updateUserParams) {
        // ex: first_name = 'SHK', last_name = 'Teste'
        const updateFields = [] // [first_name = $1, last_name = $2] => Porque ele começa como uma lista vazia e adiciona 1 no updateFields. NA PRIMEIRA INTEREAÇÃO
        const updateValues = [] // Aqui vai ficar assim: [SHK, Teste]

        // pegando cada propriedade de updatedUserParams
        Object.keys(updateUserParams).forEach((key) => {
            // Colocando elas dentro do updatedFields mas já como vai ser executada
            updateFields.push(`${key} = $${updateValues.length + 1}`)
            // lista de como vai passar
            updateValues.push(updateUserParams[key])
        })
        // EX LA EM CIMA
        // key = primeiro parametro(first_name) e $1 segundo parametro(SHK)
        // [first_name = $1, last_name = $2] => Porque ele começa como uma lista vazia e adiciona 1 no updateFields. Passando outro parametro, ele ve que a lista ja tem 1 e então entra o segundo(last_name)

        // Depois dos parametros passados pra atualizar, passa o id por ultimo
        updateValues.push(userId)

        // Manda o update pegando todas as fields do updateField e vai dar um JOIN pela virgula, ou seja, transforma a lista em uma string.
        const updateQuery = `
        UPDATE users SET ${updateFields.join(', ')}
        WHERE id = $${updateValues.length}
        RETURNING *`

        // Vai ficar assim o join, transformando a lista updateFields em uma string => 'first_name = $1, last_name = $2'
        // WHERE o id vai pegar o ultimo valor que está no updateValues que foi o push do userId
        // RETURNING * retorna o usuário atualizado

        // updateUser vai ser o valor da query
        const updateUser = await PostgresHelper.query(updateQuery, updateValues)
        // retorna o user atualizado
        return updateUser[0]
    }
}
