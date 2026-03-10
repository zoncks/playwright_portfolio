import { Locator, Page } from "@playwright/test";

export class LoginPage {
  readonly page: Page;
  //Inputs
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;

  //Validation Messages
  readonly errorMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.locator('input[name="user-name"]');
    this.passwordInput = page.locator('input[name="password"]');
    this.loginButton = page.locator('input[type="submit"]');
    this.errorMessage = page.locator('[data-test="error"]');
  }
}
