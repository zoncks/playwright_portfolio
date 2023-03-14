import { test, expect, selectors } from "@playwright/test";
//importing the POM to reuse the Username and Password
import POM from "./POM";

test.beforeEach(async ({ page }) => {
  await page.goto("/");
});

test("Assert Login Page extant", async ({ page }) => {
  //Navigate to the login page
  await expect(page).toHaveTitle("Swag Labs");
  expect(page.url()).toEqual("https://www.saucedemo.com/");
});

test("Ensure a valid user can login", async ({ page }) => {
  //Fill in the username and password fields
  await page.fill('input[name="user-name"]', POM.username);
  await page.fill('input[name="password"]', POM.password);

  //Click the login button
  await page.click('input[type="submit"]');
  //Assert that the user is taken to the inventory page
  expect(page.url()).toEqual("https://www.saucedemo.com/inventory.html");
});

//ensure username and password are populated and error message correctly updates when supplied.
test("Ensure username and password are populated", async ({ page }) => {
  //submit without populating the fields
  await page.click('input[type="submit"]');

  //Assert the usernameerror message is displayed
  await expect(page.locator('[data-test="error"]')).toHaveText(
    "Epic sadface: Username is required"
  );
  //Populate the username field and submit without populating password
  await page.fill('input[name="user-name"]', POM.username);
  await page.click('input[type="submit"]');

  //Assert the password error message is displayed
  await expect(page.locator('[data-test="error"]')).toHaveText(
    "Epic sadface: Password is required"
  );
  await page.fill('input[name="password"]', POM.password);

  //Click the login button
  await page.click('input[type="submit"]');
  //Assert that the user is taken to the inventory page
  expect(page.url()).toEqual("https://www.saucedemo.com/inventory.html");
});

test("Ensure a invalid user cannot login", async ({ page }) => {
  //Fill in the username and password fields
  await page.fill('input[name="user-name"]', POM.username);
  await page.fill('input[name="password"]', POM.incorrectPassword);

  //Click the login button
  await page.click('input[type="submit"]');
  //Assert that the user presented with an error message
  await expect(page.locator('[data-test="error"]')).toHaveText(
    "Epic sadface: Username and password do not match any user in this service"
  );
});
