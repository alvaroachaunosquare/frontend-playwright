import { test, expect } from "@playwright/test";
import { ProductsSchema } from "../../../schemas/products.schema";

test("GET /products returns a valid items list", async ({ request }) => {
  const response = await request.get("/products?limit=5");
  expect(response.status()).toBe(200);
  const body = await response.json();
  for (const product of body) {
    ProductsSchema.parse(product);
  }
});

test("GET /products/:id returns a specific item", async ({ request }) => {
  const response = await request.get("/products/1");
  expect(response.status()).toBe(200);
  const product = ProductsSchema.parse(await response.json());
  expect(product.id).toBe(1);
});