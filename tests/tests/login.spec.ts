/* 
Aim of these tests is to ensure that a valid user can login, validations are fired, invalid users are presented from loggin in. 

The standard username and password are stored in an object to enhance repeatability by only changing the password in one place.
If I had more time I'd likely have created  page mode for the log in and inventory page to further abstract the test. I'd also have set the URL as the base in the config save typing
it expicitly in the test.

*/

//importing the POM to reuse the Username and Password
import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/login.page";
import { DataModel } from "../dataObjectModel";

test.describe("Login Tests", () => {
  let dataModel: DataModel;
  let loginPage: LoginPage;

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
    "problem_user",
    "performance_glitch_user",
  ];

  validUser.forEach((userName) => {
    test(`Ensure valid user ${userName} can login`, async ({ page }) => {
      //Fill in the username and password fields
      await loginPage.usernameInput.fill(userName);
      await loginPage.passwordInput.fill(dataModel.password);

      //Click the login button
      await loginPage.loginButton.click();
      //Assert that the user is taken to the inventory page
      expect(page.url()).toEqual("https://www.saucedemo.com/inventory.html");
    });
  });
  //TEST 3 - Ensure username and password are populated and error message correctly updates when supplied.
  test("Ensure username and password are populated", async ({ page }) => {
    //submit without populating the fields
    await loginPage.loginButton.click();

    //Assert the usernam error message is displayed
    await expect(page.locator('[data-test="error"]')).toHaveText(
      "Epic sadface: Username is required"
    );

    //Populate the username field and submit without populating password
    await loginPage.usernameInput.fill(dataModel.userName);
    await loginPage.loginButton.click();

    //Assert the password error message is displayed
    await expect(page.locator('[data-test="error"]')).toHaveText(
      "Epic sadface: Password is required"
    );
    await loginPage.passwordInput.fill(dataModel.password);

    //Click the login button
    await loginPage.loginButton.click();
    //Assert that the user is taken to the inventory page
    expect(page.url()).toEqual("https://www.saucedemo.com/inventory.html");
  });

  //TEST 4 - Ensure a invalid user cannot login

  test("Ensure a invalid user cannot login", async ({ page }) => {
    //Fill in the username and password fields
    await loginPage.usernameInput.fill("locked_out_user");
    await loginPage.passwordInput.fill(dataModel.password);

    //Click the login button
    await loginPage.loginButton.click();
    //Assert that the user presented with an error message
    await expect(page.locator('[data-test="error"]')).toHaveText(
      "Epic sadface: Sorry, this user has been locked out."
    );
  });

  //TEST 4 - Ensure a invalid user cannot login
  test("Ensure a user cannot log in with an invalid password", async ({
    page,
  }) => {
    //Fill in the username and password fields
    await loginPage.usernameInput.fill(dataModel.userName);
    await loginPage.passwordInput.fill(dataModel.incorrectPassword);
    //Click the login button
    await loginPage.loginButton.click();
    //Assert that the user presented with an error message
    await expect(page.locator('[data-test="error"]')).toHaveText(
      "Epic sadface: Username and password do not match any user in this service"
    );
  });
});
