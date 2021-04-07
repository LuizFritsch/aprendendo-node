var supertest = require("supertest");
let app = require("../src/app");
let request = supertest(app);
let jwt = require("jsonwebtoken");

let usuarioPrincipal = {
    nome: "luiz fritsch",
    email: "fritsch@gmail.com",
    senha: "123"
}

beforeAll(() => {
    return request.post("/usuario").send(usuarioPrincipal).then((result) => {
        console.log(result);
    }).catch((err) => {
        console.log(err);
    });
})


describe("Cadastro de usuario", () => {

    test("Deve cadastrar um usuario com sucesso", () => {
        let tempo = Date.now();
        let email = `${tempo}@gmail.com`
        let user = {
            nome: "luiz",
            email,
            senha: "123"
        }
        return request.post("/usuario").send(user).then((result) => {
            expect(result.statusCode).toEqual(200);
            expect(result.body.email).toEqual(email);
        }).catch((err) => {
            fail(err)
        });
    })

    test("Deve impedir que cadastre um usuario com dados vazios", () => {
        let user = {
            nome: '',
            email: '',
            senha: ''
        }
        return request.post("/usuario").send(user).then((result) => {
            expect(result.statusCode).toEqual(400);
        }).catch((err) => {
            fail(err)
        });
    })

    test("Deve impedir que um usuario se cadastre com um email repetido", () => {
        let tempo = Date.now();
        let email = `${tempo}@gmail.com`
        let user = {
            nome: "luiz",
            email,
            senha: "123"
        }
        return request.post("/usuario").send(user).then((result) => {
            expect(result.statusCode).toEqual(200);
            expect(result.body.email).toEqual(email);
            return request.post("/usuario").send(user).then((result) => {
                expect(result.statusCode).toEqual(400);
                expect(result.body.erro).toEqual("Email já cadastrado...");
            }).catch((err) => {
                fail(err)
            });
        }).catch((err) => {
            fail(err)
        });
    })


})


describe("Autenticacao", () => {
    test("Deve me retornar um token quando logar", () => {
        return request.post("/auth").send({ email: usuarioPrincipal.email, senha: usuarioPrincipal.senha }).then((result) => {
            expect(result.statusCode).toEqual(200);
            expect(result.body.token).toBeDefined();
        }).catch((err) => {
            fail(err)
        });
    })

    test("Deve impedir que um usuario nao cadastrado se logue", () => {
        return request.post("/auth").send({ email: "usuarionaocadastrado@gmail.com", senha: "usuarioPrincipal.senha" }).then((result) => {
            expect(result.statusCode).toEqual(403);
            expect(result.body.errors.email).toEqual("Email não cadastrado...");
        }).catch((err) => {
            fail(err)
        });
    })

    test("Deve impedir que um usuario se logue com a senha errada", () => {
        return request.post("/auth").send({ email: usuarioPrincipal.email, senha: "senhaErrada" }).then((result) => {
            expect(result.statusCode).toEqual(403);
            expect(result.body.errors.senha).toEqual("Senha incorreta...");
        }).catch((err) => {
            fail(err)
        });
    })

})

afterAll(() => {
    return request.delete(`/usuario/deleta/enigma/${usuarioPrincipal.email}`).then((result) => {}).catch((err) => {
        console.log(err);
    });
})