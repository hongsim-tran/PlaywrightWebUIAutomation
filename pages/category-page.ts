import {Locator, Page} from "@playwright/test";
import {Navigation} from "./navigation";
import {Framework} from "../framework/framework";

export class CategoryPage extends Navigation{
    private readonly ddlSortBy: Locator;
    private readonly imgSortArrow: Locator;
    private readonly lnkProductThumbnails: Locator;
    private readonly lnkProductNames: Locator;
    private readonly txtProductPrices: Locator;
    private readonly txtProductCount: Locator;
    private readonly txtNoProducts: Locator;

    constructor(page: Page) {
        super (page);
        this.ddlSortBy = page.locator(".dropdown select");
        this.imgSortArrow = page.locator(".sort-direction a svg");
        this.lnkProductThumbnails = page.locator(".product-thumbnail-listing a");
        this.lnkProductNames = page.locator(".product-name a");
        this.txtProductPrices = page.locator(".product-price-listing span");
        this.txtProductCount = page.locator(".product-count");
        this.txtNoProducts = page.locator(".product-list");
    }

    async selectSortByDropdown(option: string){
        await this.ddlSortBy.selectOption(option);
    }

    async clickSortArrow(isUp: boolean){
        if (isUp){
            if ((await this.imgSortArrow.getAttribute("class"))?.includes("arrow-down"))
                await this.imgSortArrow.click();
        } else {
            if ((await this.imgSortArrow.getAttribute("class"))?.includes("arrow-up"))
                await this.imgSortArrow.click();
        }
        await this.wait(Framework.SHORT_TIMEOUT);
    }

    async clickProductThumbnail(index: number){
        await this.lnkProductThumbnails.nth(index).click();
    }

    async clickProductName(input: string | number){
        if (typeof input === "string"){
            await this.lnkProductNames.getByText(input).click();
        } else {
            await this.lnkProductNames.nth(input).click();
        }
    }

    async getProductNames(){
        return await this.lnkProductNames.allTextContents();
    }

    async getProductName(index: number){
        return await this.lnkProductNames.nth(index).textContent();
    }

    async getProductPrices(){
        return await this.txtProductPrices.allTextContents();
    }

    async getProductPrice(index: number){
        return await this.txtProductPrices.nth(index).textContent();
    }

    async getNumberOfProducts(){
        return await this.lnkProductNames.count();
    }

    async getProductCount() : Promise<number> {
        const productCountString = await this.txtProductCount.textContent();
        return Number(productCountString?.split(" ")[0]);
    }

    async getNoProductText(){
        return await this.txtNoProducts.textContent();
    }
}