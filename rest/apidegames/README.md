# Minha primeira Documentacao de API
# API de games

Esta API eh utilizada para consumo 

## Endpoints

### GET /games
Este endpoint eh responsavel por retornar todos os games cadastrados no BD em JSON
#### Parametros
Nenhum
#### Respostas
##### OK! 200
Listagem de todos os games ok

Exemplo de resposta:
```JSON
[
    {
        "id": 1,
        "name": "tibia",
        "year": "1997",
        "price": 60
    },
    {
        "id": 2,
        "name": "minecraft",
        "year": "2014",
        "price": 239
    },
    {
        "id": 3,
        "name": "cs",
        "year": "1997",
        "price": 15
    }
]
```

##### Falha na autenticacao! 401
Caso essa resposta aconteca significa que durante o processo de autenticacao da requisicao. motivos: token invalido, token expirado!

Exemplo:
```JSON
{
    "err": "token invalido"
}
```


### POST /auth
Este endpoint eh responsavel por fazer o processo de login
#### Parametros
email: email do usuario cadastrado
password: senha do usuario cadastrado

Exemplo:
```JSON
{
    "email":"emaildousuario@gmail.com",
    "password":"123"
}
```


#### Respostas
##### OK! 200
Login efetuado com sucesso, retorna o token JWT pra acessar as rotas

Exemplo de resposta:
```JSON
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJmcml0c2NoLmd1aWxoZXJtM0BnbWFpbC5jb20iLCJpYXQiOjE2MTczNjg4NDgsImV4cCI6MTYxNzU0MTY0OH0.hPd4WwFXm4aATAE-8z1sHXh8VjifQMgT2gq5xGDKav4"
}
```

##### Falha na autenticacao! 401
Caso essa resposta aconteca significa que durante o processo de autenticacao da requisicao. motivos: senha ou email incorreto!

Exemplo:
```JSON
{
    "err": "credenciais invalidas"
}
```
