// Erros relacionados ao usuário extendendo errors do js
export class EmailAlreadyInUseError extends Error {
    // passa o email que veio lá do use case quando retorna EmailAlreadyInUseError
    constructor(email) {
        super(`The e-mail ${email} is already in use`)
        this.name = 'EmailAlreadyInUseError'
    }
}
