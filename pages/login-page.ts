import {Navigation} from "./navigation";
import {Locator, Page} from "@playwright/test";

export class LoginPage extends Navigation{
    private readonly txbEmail: Locator;
    private readonly txbPassword: Locator;
    private readonly btnSignIn: Locator;
    private readonly lnkCreateAnAccount: Locator;
    private readonly lnkForgotPassword: Locator;
    private readonly txtEmailError: Locator;
    private readonly txtPasswordError: Locator;
    private readonly txtCredentialError: Locator;

    constructor(page: Page) {
        super(page);
        this.txbEmail = page.getByPlaceholder("Email");
        this.txbPassword = page.getByPlaceholder("Password");
        this.btnSignIn = page.getByRole("button", {name: /sign in/i});
        this.lnkCreateAnAccount = page.getByRole("link").getByText(/Create an account/i);
        this.lnkForgotPassword = page.getByRole("link").getByText(/Forgot your password?/i);
        this.txtEmailError = page.locator(".form-field-container.has-error")
            .filter({has: page.getByPlaceholder("Email")}).locator(".field-error");
        this.txtPasswordError = page.locator(".form-field-container.has-error")
            .filter({has: page.getByPlaceholder("Password")}).locator(".field-error");
        this.txtCredentialError = page.locator(".text-critical");
    }

    async inputEmail(email: string){
        await this.txbEmail.fill(email);
    }

    async inputPassword(password: string){
        await this.txbPassword.fill(password);
    }

    async clickSignInButton(){
        await this.btnSignIn.click();
    }

    async clickCreatAccountLink(){
        await this.lnkCreateAnAccount.click();
    }

    async clickForgotPasswordLink(){
        await this.lnkForgotPassword.click();
    }

    async getEmailErrorMessage(){
        return await this.txtEmailError.textContent();
    }

    async getPasswordErrorMessage(){
        return await this.txtPasswordError.textContent();
    }

    async getCredentialErrorMessage(){
        return await this.txtCredentialError.textContent();
    }

}