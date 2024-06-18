/* 
Aim of these tests is to ensure that a valid user can login, validations are fired, invalid users are presented from loggin in. 

The standard username and password are stored in an object to enhance repeatability by only changing the password in one place.
If I had more time I'd likely have created  page mode for the log in and inventory page to further abstract the test. I'd also have set the URL as the base in the config save typing
it expicitly in the test.

*/

//importing the POM to reuse the Username and Password
import { test, expect } from "@playwright/test";
import { DataModel } from "./dataObjectModel";

test.describe("Login Tests", () => {
  let dataModel: DataModel;

  test.beforeEach(async ({ page }) => {
    dataModel = new DataModel(page);
    await page.goto("/");
  });

  //TEST 1 - Ensure Login Page is Loaded
  test("Assert Login Page extant", async ({ page }) => {
    //Navigate to the login page
    await expect(page).toHaveTitle("Swag Labs");
    expect(page.url()).toEqual("https://www.saucedemo.com/");
  });

  //TEST 2 - Ensure a valid user can login
  const validUser = [
    "standard_user",
    "locked_out_user",
    "problem_user",
    "performance_glitch_user",
  ];

  validUser.forEach((userName) => {
    test(`Ensure valid user ${userName} can login`, async ({ page }) => {
      //Fill in the username and password fields
      await page.fill('input[name="user-name"]', userName);

      await page.fill('input[name="password"]', dataModel.password);

      //Click the login button
      await page.click('input[type="submit"]');
      //Assert that the user is taken to the inventory page
      expect(page.url()).toEqual("https://www.saucedemo.com/inventory.html");
    });

    //TEST 3 - Ensure username and password are populated and error message correctly updates when supplied.
    test("Ensure username and password are populated", async ({ page }) => {
      //submit without populating the fields
      await page.click('input[type="submit"]');

      //Assert the usernam error message is displayed
      await expect(page.locator('[data-test="error"]')).toHaveText(
        "Epic sadface: Username is required"
      );
      //Populate the username field and submit without populating password
      await page.fill('input[name="user-name"]', dataModel.userName);
      await page.click('input[type="submit"]');

      //Assert the password error message is displayed
      await expect(page.locator('[data-test="error"]')).toHaveText(
        "Epic sadface: Password is required"
      );
      await page.fill('input[name="password"]', dataModel.password);

      //Click the login button
      await page.click('input[type="submit"]');
      //Assert that the user is taken to the inventory page
      expect(page.url()).toEqual("https://www.saucedemo.com/inventory.html");
    });

    //TEST 4 - Ensure a invalid user cannot login

    test("Ensure a invalid user cannot login", async ({ page }) => {
      //Fill in the username and password fields
      await page.fill('input[name="user-name"]', dataModel.userName);
      await page.fill('input[name="password"]', dataModel.incorrectPassword);

      //Click the login button
      await page.click('input[type="submit"]');
      //Assert that the user presented with an error message
      await expect(page.locator('[data-test="error"]')).toHaveText(
        "Epic sadface: Username and password do not match any user in this service"
      );
    });
  });
});
