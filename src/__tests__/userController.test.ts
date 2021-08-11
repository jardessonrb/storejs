import request from 'supertest';
import { router } from "../router";

describe("Iniciando com testes ...", () => {
  test("Teste 1", async () => {
    const res = await request(router)
    .post("/users")
    .send({
      name_user: "jardesson",
      email_user: "jardesson@gsm.com",
      password_user: "1234567"
    })
  });
})

