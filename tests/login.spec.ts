import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/Login";

let loginPage: LoginPage;

test.beforeEach(async ({ page }) => {
  await page.goto("/");
  loginPage = new LoginPage(page);
});

test("Verify page title is Swag Labs", async ({ page }) => {
  await expect(page).toHaveTitle("Swag Labs");
});

test("Verify login button is visible and enabled", async () => {
  expect(await loginPage.isLoginButtonVisible()).toBeTruthy();
  expect(await loginPage.isLoginButtonEnabled()).toBeTruthy();
});

test("Verify error is thrown when user use wrong credentials", async () => {
   await loginPage.login("wrong_user", "wrong_pasword");
   expect(await loginPage.isWrongCredentialsErrorVisible()).toBeTruthy();
});

test("Verify error is thrown when locked out user tries to login", async () => {
   await loginPage.login("locked_out_user", "secret_sauce");
   expect(await loginPage.isLocketOutUserErrorVisible()).toBeTruthy();
});

test("Verify user is successfully logged in with valid credentials", async ({ page }) => {
   await loginPage.login("standard_user", "secret_sauce");
   await expect(page).toHaveURL(/inventory/);
});
