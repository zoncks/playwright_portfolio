import { test, expect } from "@playwright/test";
import { LoginPage } from "../../utils/pages/login.page";
import { DataModel } from "../../utils/fixtures/data";

test.describe('Visual Testing - Login Page', () => {
  let dataModel: DataModel;
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    dataModel = new DataModel(page);
    loginPage = new LoginPage(page);
    await page.goto("https://www.saucedemo.com/");
  });

  test.describe('Page Loading', () => {
    //TEST 1 - Ensure Login Page is Loaded
    test("Login Page", async ({ page }) => {
      //Navigate to the login page
      await expect(page).toHaveTitle("Swag Labs", { timeout: 10000 });
      await expect(page).toHaveScreenshot();
    });
  });

  test.describe('Form Validations', () => {
    //TEST 2  - Ensure username validation is present.
    test("Ensure username validation correctly fires", async ({ page }) => {
      //submit without populating the fields
      await loginPage.loginButton.click();

      await expect(page).toHaveScreenshot();
    });
  });
});