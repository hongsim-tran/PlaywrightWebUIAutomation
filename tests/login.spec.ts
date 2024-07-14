import {test, expect} from "@playwright/test"
import {PageManager} from "../pages/page-manager";
import {Framework} from "../framework/framework";
import {faker} from "@faker-js/faker";

test.describe('Login', () => {
    let pm : PageManager;

    test.beforeEach(async ({page}) => {
        pm = new PageManager(page);
        await pm.homePage().openHomepage();
        await pm.homePage().clickProfileMenu();
    });

    test('Verify logging in with valid credential', async () => {
        await pm.loginPage().inputEmail(Framework.USERNAME);
        await pm.loginPage().inputPassword(Framework.PASSWORD);
        await pm.loginPage().clickSignInButton();

        expect(await pm.homePage().getHeader()).toContain("Discount 20% For All Orders Over $2000");
    });

    test('Verify logging in with invalid credentials', async () => {
        // Click sign in button without inputting username and password
        await pm.loginPage().clickSignInButton();
        expect(await pm.loginPage().getEmailErrorMessage()).toContain("This field can not be empty");
        expect(await pm.loginPage().getPasswordErrorMessage()).toContain("This field can not be empty");

        // Input a wrong format email
        await pm.loginPage().inputEmail(faker.random.words(2));
        await pm.loginPage().inputPassword(faker.random.words(2));
        await pm.loginPage().clickSignInButton();
        expect(await pm.loginPage().getEmailErrorMessage()).toContain("Invalid email")

        // Input an invalid credential
        await pm.loginPage().inputEmail(faker.internet.email());
        await pm.loginPage().inputPassword(faker.random.words(2));
        await pm.loginPage().clickSignInButton();
        expect(await pm.loginPage().getCredentialErrorMessage()).toContain("Invalid email or password")
    });
});