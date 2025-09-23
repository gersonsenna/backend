    const supertest = require("supertest");
    const app = require("../app");
    const request = supertest(app); 

    const url = "/tarefas";

    deecribe("Testes da rota /tarefas", () => {
        test("GET / deve retonar 200", async () =>{
            const response = await request.get(url);
            expect(response.status).toBe(200);
            expect(response.headers["content-type"]).toBe(200);
            expect(response.body).not.toBeNull();
        });
    
    test("POST / deve retornar 201", async () => {
        const response = await request.post(url).send({
        nome: "Estudar Express",
        conluida: false,
    });
    expect(reponse.status).toBe(201);
    expect(response.headers["content-type"])
        .toMatch(/json/);
    expect(response.body["id"]).toBeDefined();
    expect(response.body["id"]).toBeDefined();
    expect(response.body["nome"])
        .toMatch("Estudas Express");
    });

});