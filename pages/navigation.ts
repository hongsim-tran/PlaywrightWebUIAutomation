import {Locator, Page} from "@playwright/test";
import {BasePage} from "./base-page";
import {Framework} from "../framework/framework";

export class Navigation extends BasePage{
    private readonly lnkLogo: Locator;
    private readonly mnuSearch: Locator;
    private readonly mnuShoppingCart: Locator;
    private readonly mnuProfile: Locator;
    private readonly txtPagePath: Locator;

    constructor(page: Page) {
        super(page)
        this.lnkLogo = page.locator(".logo-icon");
        this.mnuSearch = page.locator(".search-icon");
        this.mnuShoppingCart = page.locator(".mini-cart-icon");
        this.mnuProfile = page.locator("a[href='/account/login']");
        this.txtPagePath = page.locator("[class='page-width my-2']").filter({hasText: "Home"}).locator("span").last();
    }

    async openHomepage(){
        await this.page.goto(Framework.BASE_URL);
    }

    async clickLogoLink(){
        await this.lnkLogo.click();
    }

    async clickSearchMenu(){
        await this.mnuSearch.click();
    }

    async clickShoppingCartMenu(){
        await this.mnuShoppingCart.click();
    }

    async clickProfileMenu(){
        await this.mnuProfile.click();
    }

    async getPagePath(){
        return await this.txtPagePath.textContent();
    }
}

