import {Navigation} from "./navigation";
import {Locator, Page} from "@playwright/test";

export class Homepage extends Navigation{
    private readonly txtHeader: Locator;
    private readonly btnCategory: Locator;
    private readonly lnkProductThumbnail: Locator;
    private readonly lnkProductName: Locator;
    private readonly txtProductPrice: Locator;

    constructor(page: Page) {
        super(page);
        this.txtHeader = page.locator(".h1")
        this.btnCategory = page.locator("a.button.primary")
        this.lnkProductThumbnail = page.locator(".product-thumbnail-listing a")
        this.lnkProductName = page.locator(".product-name a")
        this.txtProductPrice = page.locator(".sale-price")
    }

    async getHeader(){
        return await this.txtHeader.textContent();
    }

    async clickCategoryButton(categoryName: string){
        await this.btnCategory.getByText(categoryName).click();
    }

    async clickProductThumbnail(index: number){
        await this.lnkProductThumbnail.nth(index).click();
    }

    async clickProductName(productInput: string | number){
        if (typeof productInput === "string"){
            await this.lnkProductName.getByText(productInput).click();
        } else {
            await this.lnkProductName.nth(productInput).click();
        }
    }

    async getProductName(index: number){
        return await this.lnkProductName.nth(index).textContent();
    }

    async getProductNames(){
        return await this.lnkProductName.allTextContents()
    }

    async getProductPrice(index: number){
        return await this.txtProductPrice.nth(index).textContent();
    }

    async getProductPrices(){
        return await this.txtProductPrice.allTextContents()
    }
}