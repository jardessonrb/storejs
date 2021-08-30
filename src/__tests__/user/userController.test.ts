import connection from '../../connection';
import request from 'supertest';
import { router } from '../../router';

test('creates a user', async () => {
  await connection.create();
  const res = await request(router).get("/products/getAllProductsOrderEmphasis");

  expect(res.statusCode).toBe(200);
})


// function sum(num: number, num2: number){
//   return num + num2;
// }

// test("test", () => {
//   expect(sum(2, 1)).toBe(3);
// })
