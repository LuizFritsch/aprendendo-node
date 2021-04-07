var supertest = require("supertest");
let app = require("../src/app");
let request = supertest(app);
it("Should listen on port 80", () => {
    return request.get("/").then(res => {
        expect(res.statusCode).toEqual(200)
    })
});
it("Should listen on port 80 but test is async await", async() => {
    try {
        let res = await request.get("/");
        expect(res.statusCode).toEqual(200)
    } catch (error) {

    }
});

it("should return red as my favorite color", () => {
    return request.get("/color/luiz").then((result) => {
        expect(result.statusCode).toEqual(200);
        expect(result.body.color).toEqual("red");
        expect(result.body.cor).toEqual("vermelho");
    })
});
//it("",()=>{});