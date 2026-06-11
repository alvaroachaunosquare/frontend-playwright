import { test, expect } from "@playwright/test";
import { ProductsSchema } from "../../../schemas/products.schema";
import products from "../../../data/products.json";

let token: string;

test.beforeAll(async ({ request }) => {
  const response = await request.post("/auth/login", {
    data: { username: "mor_2314", password: "83r5^_" },
  });
  expect(response.status()).toBe(201);
  const body = await response.json();
  token = body.token;
});

for (const product of products) {
  test('POST /products creates "' + product.title + '"', async ({ request }) => {
      const response = await request.post("/products", {
        data: product,
        headers: { Authorization: 'Bearer "' + token + '"' },
      });
      expect(response.status()).toBe(201);
      const body = ProductsSchema.parse(await response.json());
      expect(body.title).toBe(product.title);
      expect(body.price).toBe(product.price);
    },
  );
}
