import {Navigation} from "./navigation";
import {Page} from '@playwright/test'
import {Homepage} from "./homepage";
import {LoginPage} from "./login-page";
import {CategoryPage} from "./category-page";
import {ProductDetailsPage} from "./product-details-page";
import {ShoppingCartPage} from "./shopping-cart-page";

export class PageManager {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    navigationPage(){
        return new Navigation(this.page);
    }

    homePage(){
        return new Homepage(this.page);
    }

    loginPage(){
        return new LoginPage(this.page);
    }

    categoryPage(){
        return new CategoryPage(this.page);
    }

    productDetailsPage(){
        return new ProductDetailsPage(this.page);
    }

    shoppingCartPage(){
        return new ShoppingCartPage(this.page);
    }
}