
# Vitor Rafael Marcelino

### Desafio API RESTful

#### O que deveria ser feito?

Desenvolver uma API RESTful para autenticação de usuários, que permita operações de cadastro (sign up),
autenticação (sign in) e recuperação de informações do usuário.

## Endpoints

### Registro de Usuário
- **Método:** POST
- **URL:** `/users/register`
- **Corpo da Requisição:**
    ```json
    {
        "nome": "nome",
        "email": "example@email.com",
        "senha": "suasenha",
        "telefones": [{"numero": "999999999", "ddd": "47"}]
    }
    ```

### Login de Usuário
- **Método:** POST
- **URL:** `/users/login`
- **Corpo da Requisição:**
    ```json
    {
        "email": "example@email.com",
        "senha": "suasenha"
    }
    ```

### Ver dados do Usuário
- **Método:** GET
- **URL:** `/users`
- **Headers da Requisição:**
    - `Authorization: Bearer <seu_token>`

### Observações
- O token  gerado no registro ou login deve ser enviado no header das requisições como Bearer Token.
- O token expira em 30 minutos.
