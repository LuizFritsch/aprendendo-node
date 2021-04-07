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
    console.log("iniciando switch de testes...");
    //inserir usuario global luiz no banco
    return request.post("/user").send(usuarioPrincipal).then((result) => {}).catch((err) => {
        console.log(err);
    });

})

afterAll(() => {
    console.log("finalizando switch de testes...");
    //deletar usuario global luiz do banco
    return request.delete(`/usuario/deleta/enigma/${usuarioPrincipal.email}`).then((result) => {}).catch((err) => {
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