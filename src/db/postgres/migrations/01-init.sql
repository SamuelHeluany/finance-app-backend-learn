-- CRIA A TABELA users SE ELA NÃO EXISTIR
CREATE TABLE IF NOT EXISTS users(
    ID UUID PRIMARY KEY, -- ID com UUID e chave primária
    first_name VARCHAR(50) NOT NULL, -- primeiro nome com 50 caracteres no max e obrigatório
    last_name VARCHAR(50) NOT NULL, -- ulitimo nome com 50 caracteres no max e obrigatório
    email VARCHAR(100) NOT NULL UNIQUE, -- email com 100 caracteres no max e obrigatório
    password VARCHAR(100) NOT NULL -- senha com 100 caracteres no max e obrigatório
);

-- CONDIÇÃO DE CRIAÇÃO DE TYPES PARA RODAR CASO O ARQUIVO CASO JA EXISTA O TYPE
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'transaction_type') THEN
    -- ENUM PARA OS TIPOS DE TRANSAÇÃO - GANHO, GASTO E INVESTIMENTO.
        CREATE TYPE transaction_type AS ENUM ('EARNING', 'EXPENSE', 'INVESTIMENT');
    END IF;
END$$;

-- CRIA TABELA transactions se ela não existir
CREATE TABLE IF NOT EXISTS transactions(
    ID UUID PRIMARY KEY, -- ID com UUID e chave primária
    user_id UUID REFERENCES users(ID) ON DELETE CASCADE NOT NULL, -- user_id é a FK do ID do user, ou seja, tem que referenciar a o ID do usuário. Tambem tem que fazer o delete on cascade que é deletar as transações do usuário, caso ele seja excluído.
    name VARCHAR(100) NOT NULL, -- nome com 50 caracteres no max e obrigatório
    date DATE NOT NULL, -- data no formato DATE obrigatória
    ammount NUMERIC(10,2) NOT NULL, -- quantidade numerica com 10 casas antes da virgula e duas depois da virgula (R$1000,20)
    type transaction_type NOT NULL -- Tipo de transação com ENUM(transaction_type) obrigatório.
)

