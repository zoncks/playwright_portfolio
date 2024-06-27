import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/login.page";
import { InventoryPage } from "../pages/inventory.page";
import { DataModel } from "../data";

test.describe("Inventory Page Tests", () => {
  let dataModel: DataModel;
  let inventoryPage: InventoryPage;
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    dataModel = new DataModel(page);
    loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);

    await page.goto("/");
    await loginPage.usernameInput.fill(dataModel.userName);
    await loginPage.passwordInput.fill(dataModel.password);
    await loginPage.loginButton.click();
  });

  //TEST 1 - Ensure
  test("Assert Inventory Page extant", async ({ page }) => {
    //Navigate to the inventory page
    await expect(page).toHaveTitle("Swag Labs");
    expect(page.url()).toEqual("https://www.saucedemo.com/inventory.html");
  });
});
