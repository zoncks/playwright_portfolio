/* 
Aim of these tests is to ensure that a valid user can login, validations are fired, invalid users are presented from loggin in. 
The standard username and password are stored in an object to enhance repeatability by only changing the password in one place.
*/

//importing the POM to reuse the Username and Password
import { test, expect } from "@playwright/test";
import { LoginPage } from "../../utils/pages/login.page";
import { DataModel } from "../../utils/fixtures/data";

test.describe('Login Page', () => {
  let dataModel: DataModel;
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    dataModel = new DataModel(page);
    loginPage = new LoginPage(page);
    await page.goto("https://www.saucedemo.com/");
  });

  test.describe('Page Loading', () => {
    //TEST 1 - Ensure Login Page is Loaded
    test("Assert Login Page extant", async ({ page }) => {
      //Navigate to the login page
      await expect(page).toHaveTitle("Swag Labs");
      expect(page.url()).toEqual("https://www.saucedemo.com/");
    });
  });

  test.describe('Form Validations', () => {
    //TEST 2  - Ensure username validation is present.
    test("Ensure username validation correctly fires", async ({ page }) => {
      //submit without populating the fields
      await loginPage.loginButton.click();

      //Assert the usernam error message is displayed
      await expect(page.locator('[data-test="error"]')).toHaveText(
        "Epic sadface: Username is required"
      );
    });

    //TEST 3  - Ensure password validation is present.
    test("Ensure password validation correctly fires", async ({ page }) => {
      //Populate the username field and submit without populating password
      await loginPage.usernameInput.fill(dataModel.userName);
      await loginPage.loginButton.click();

      //Assert the password error message is displayed
      await expect(page.locator('[data-test="error"]')).toHaveText(
        "Epic sadface: Password is required"
      );
    });

    //TEST 4 - Ensure validation is removed after valid input made
    test("Ensure validation is removed after valid input made", async ({
      page,
    }) => {
      //submit without populating the fields
      await loginPage.loginButton.click();

      //Assert the username error message is displayed
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

      //Populate the password field
      await loginPage.passwordInput.fill(dataModel.password);
      await loginPage.loginButton.click();

      //Assert the password error message is displayed
      await expect(page.locator('[data-test="error"]')).not.toBeVisible();
    });
  });

  test.describe('Authentication Scenarios', () => {
    test.describe('Valid Users', () => {
      //TEST 5 - Ensure a valid user can login
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
    });

    test.describe('Invalid Scenarios', () => {
      //TEST 6 - Ensure a locked user cannot login
      test("Ensure a locked out user cannot login", async ({ page }) => {
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

      //TEST 7 - Ensure a invalid user cannot login
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

      //TEST 8 - Ensure a user cannot log in with an invalid username
      test("Ensure a user cannot log in with an invalid username", async ({
        page,
      }) => {
        //Fill in the username and password fields
        await loginPage.usernameInput.fill("invalid_user");
        await loginPage.passwordInput.fill(dataModel.password);
        //Click the login button
        await loginPage.loginButton.click();
        //Assert that the user presented with an error message
        await expect(page.locator('[data-test="error"]')).toHaveText(
          "Epic sadface: Username and password do not match any user in this service"
        );
      });
    });
  });
});
