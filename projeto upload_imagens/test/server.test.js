var supertest = require("supertest");
let app = require("../src/app");
let request = supertest(app);
test("deve rodar na porta 80", () => {
    return request.get("/").then(res => {
        expect(res.statusCode).toEqual(200)
    }).catch(err => {
        fail(err);
    });
});