const supertest = require("supertest");
const app = require("../app");

const request = supertest(app);

let id = null;
let token = null;

describe("Teste /usuarios", () => {
  test("POST /usuarios retorna 201", async () => {
    const response = await request
      .post("/usuario")
      .send({ email: "usuario@email.com", senha: "abcd1234" });
    expect(response.status).toBe(201);
    expect(response.headers["content-type"]).toMatch(/json/);
    expect(response.body._id).toBeDefined();
    expect(response.body.email).toBe("usuario@email.com");
    id = response.body._id;
  });

  test("POST /usuarios retorna 422", async () => {
    const response = await request.post("/usuario");
    expect(response.status).toBe(422);
    expect(response.body.msg).toBe("Email e Senha são obrigatórios");
  });

  test("POST /usuarios/login retorna 200", async () => {
    const response = await request
      .get("/usuario/login")
      .send({ email: "usuario@email.com", senha: "abcd1234" });
    expect(response.status).toBe(200);
    expect(response.headers["content-type"]).toMatch(/json/);
    expect(response.body.token).toBeDefined();
    token = response.body.token;
  });

  test("POST /usuarios/login sem JSON retorna 401", async () => {
    const response = await request.post("/usuarios/login");
    expect(response.status).toBe(401);
    expect(response.body.msg).toBe("Credenciais inválidas");
  });

  test("POST /usuarios/renovar retorna 200", async () => {
    const response = await request
      .post("/usuarios/renovar")
      .set("authorization", `Bearer ${token}`);
    expect(response.status).toBe(200);
    expect(response.headers["content-type"]).toMatch(/json/);
    expect(response.body.token).toBeDefined();
  });

  test("POST /usuarios/renovar retorna 401 com token inválido", async () => {
    const response = await request
      .post("/usuarios/renovar")
      .set("authorization", "Bearer 123456789");
    expect(response.status).toBe(401);
    expect(response.body.msg).toBe("Token inválido");
  });

  test("DELETE /usuarios/:id retorna 204", async () => {
    const response = await request
      .delete(`/usuarios/${id}`)
      .set("authorization", `Bearer ${token}`);
    expect(response.status).toBe(204);
  });
});
