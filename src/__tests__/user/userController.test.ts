import connection from '../../connection';
import request from 'supertest';
import { router } from '../../router';


describe("teste user", () => {
  test('creates a user', async () => {
    await connection.create();
    const res = await request(router).get("/products/getAllProductsOrderEmphasis");

    console.log(res)
  })
})

