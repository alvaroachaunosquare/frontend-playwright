import { Page } from "playwright";

export class LoginPage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  // Locators

  get usernameInput() {
    return this.page.locator('[data-test="username"]');
  }

  get passwordInput() {
    return this.page.locator('[data-test="password"]');
  }

  get loginButton() {
    return this.page.getByRole("button");
  }

  get wrongCredentialsError() {
    return this.page.getByRole("heading", {
      name: "Epic sadface: Username and password do not match any user in this service",
    });
  }
  get lockedOutUserError() {
    return this.page.getByRole("heading", {
      name: "Epic sadface: Sorry, this user has been locked out.",
    });
  }

  // Actions

  async clickLoginButton() {
    await this.loginButton.click();
  }

  async fillUsername(username: string) {
    await this.usernameInput.fill(username);
  }

  async fillPassword(password: string) {
    await this.passwordInput.fill(password);
  }

  async login(username: string, password: string) {
    await this.fillUsername(username);
    await this.fillPassword(password);
    await this.clickLoginButton();
  }

  // Assertions

  async isLoginButtonVisible() {
    return await this.loginButton.isVisible();
  }

  async isLoginButtonEnabled() {
    return await this.loginButton.isEnabled();
  }

  async isWrongCredentialsErrorVisible() {
    return await this.wrongCredentialsError.isVisible();
  }

    async isLocketOutUserErrorVisible() {
    return await this.lockedOutUserError.isVisible();
  }
}
