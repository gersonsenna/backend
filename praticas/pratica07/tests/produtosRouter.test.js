const supertest = require('supertest')
const app = require('../app')

const request = supertest(app)

const url = '/produtos'

let id = null
describe("Teste rota /produtos", ()=>{
    test("POST /produtos retorna 201", async()=>{
        const response = await request.post(url).send({ nome: "Laranja", preco: 10.0 })
        expect(response.status).toBe(201)
        expect(response.headers["content-type"]).toMatch(/json/);
        expect(response.body._id).toBeDefined();
        expect(response.body.nome).toBe("Laranja")
        expect(response.body.preco).toBe(10)
        id = response.body._id
    });

    test("POST /produtos retorna 422", async () => {
        const response = await request.post(url)
        expect(response.status).toBe(422)
        expect(response.body.msg).toBe("Nome e preço do produto são obrigatórios")
    });

    test("GET /produtos retorna 200", async () => {
        const response = await request.get(url)
        expect(response.status).toBe(200)
        expect(response.headers["content-type"]).toMatch(/json/);
    });
    test("GET /produtos/:id retorna 200", async () => {
        const response = await request.get(`${url}/${id}`)
        expect(response.status).toBe(200)
        expect(response.headers["content-type"]).toMatch(/json/);
        expect(response.body._id).toBe(id)
        expect(response.body.nome).toBe("Laranja")
        expect(response.body.preco).toBe(10)
    });
    test("GET /produtos/0 retorna 400", async () => {
        const response = await request.get(`${url}/0`)
        expect(response.status).toBe(400)
        expect(response.headers["content-type"]).toMatch(/json/);
        expect(response.body.msg).toBe("Parâmetro inválido")
    });
    test("GET /produtos retorna 404", async () => {
        const response = await request.get(`${url}/000000000000000000000000`)
        expect(response.status).toBe(404)
        expect(response.headers["content-type"]).toMatch(/json/);
        expect(response.body.msg).toBe("Produto não encontrado")
    });

    test("PUT /produtos retorna 200", async () => {
        const response = await request.put(`${url}/${id}`).send({nome: "Laranja Pera", preco: 18.00})
        expect(response.status).toBe(200)
        expect(response.headers["content-type"]).toMatch(/json/);
        expect(response.body._id).toBeDefined();
        expect(response.body.nome).toBe("Laranja Pera")
        expect(response.body.preco).toBe(18)
    });

    test("PUT /produtos retorna 422", async () => {
        const response = await request.put(`${url}/${id}`).send({nome: ""})
        expect(response.status).toBe(422)
        expect(response.body.msg).toBe("Nome e preço do produto são obrigatórios")
    });
    test("PUT /produtos/0 retorna 400", async () => {
        const response = await request.put(`${url}/0`)
        expect(response.status).toBe(400)
        expect(response.headers["content-type"]).toMatch(/json/);
        expect(response.body.msg).toBe("Parâmetro inválido")
    });
    test("PUT /produtos retorna 404", async () => {
        const response = await request.put(`${url}/000000000000000000000000`)
        expect(response.status).toBe(404)
        expect(response.headers["content-type"]).toMatch(/json/);
        expect(response.body.msg).toBe("Produto não encontrado")
    });
    test("DELETE /produtos/:id retorna 204", async () => {
        const response = await request.delete(`${url}/${id}`)
        expect(response.status).toBe(204)
    });
    test("DELETE /produtos/0 retorna 400", async () => {
        const response = await request.delete(`${url}/0`)
        expect(response.status).toBe(400)
        expect(response.headers["content-type"]).toMatch(/json/);
        expect(response.body.msg).toBe("Parâmetro inválido")
    });
    test("DELETE /produtos retorna 404", async () => {
        const response = await request.delete(`${url}/000000000000000000000000`)
        expect(response.status).toBe(404)
        expect(response.headers["content-type"]).toMatch(/json/);
        expect(response.body.msg).toBe("Produto não encontrado")
    });
});