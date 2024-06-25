import { test, expect, Locator } from "@playwright/test";

export class LoginPage {
  readonly page: any;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;

  constructor(page: any) {
    this.page = page;
    this.usernameInput = page.locator('input[name="user-name"]');
    this.passwordInput = page.locator('input[name="password"]');
    this.loginButton = page.locator('input[type="submit"]');
  }
}