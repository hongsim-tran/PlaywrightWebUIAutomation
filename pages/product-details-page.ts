import {Navigation} from "./navigation";
import {expect, Locator, Page} from "@playwright/test";
import {Framework} from "../framework/framework";

export class ProductDetailsPage extends Navigation{
    private readonly txtProductName: Locator;
    private readonly txtProductPrice: Locator;
    private readonly txtSku: Locator;
    private readonly txtSelectedVariants: Locator;
    private readonly txbQty: Locator;
    private readonly txtQtyError: Locator;
    private readonly btnAddToCart: Locator;
    private readonly btnVariantBlocks: Locator;
    private readonly txtVariantError: Locator;
    private readonly txtDescription: Locator;

    constructor(page: Page) {
        super(page);
        this.txtProductName = page.locator(".product-single-name");
        this.txtProductPrice = page.locator(".product-single-price");
        this.txtSku = page.locator(".product-single-sku");
        this.txtSelectedVariants = page.locator(".list-disc.list-inside");
        this.txbQty = page.getByPlaceholder("Qty");
        this.txtQtyError = page.locator(".add-to-cart .text-critical");
        this.btnAddToCart = page.getByRole("button", {name: /add to cart/i});
        this.btnVariantBlocks = page.locator(".variant-option-list");
        this.txtVariantError = page.locator(".variant-validate.error");
        this.txtDescription = page.locator(".product-description");
    }

    async getProductName(){
        return await this.txtProductName.textContent();
    }

    async getProductPrice(){
        return await this.txtProductPrice.textContent();
    }

    async getSku(){
        const skuFullString = await this.txtSku.textContent();
        return (skuFullString == null) ? null : skuFullString.split(":")[1];
    }

    async getSelectedVariants(){
        return await this.txtSelectedVariants.allTextContents();
    }

    async inputQty(qty: string){
        await this.txbQty.fill(qty);
    }

    async getQtyErrorMessage(){
        return this.txtQtyError.textContent();
    }

    async isQtyErrorMessageVisible(){
        return expect(this.txtQtyError).toBeVisible();
    }

    async clickAddToCartButton(){
        await this.btnAddToCart.click();
        await this.wait(Framework.SHORT_TIMEOUT);
    }

    async clickVariantButtons(...variants: string[]){
        for (const variant of variants){
            const variantButton = this.btnVariantBlocks.locator("li", {hasText: variant});
            if (await variantButton.getAttribute("class") !== "un-available"){
                await variantButton.click();
                await this.wait(1);
            }
            else throw new Error(`The variant ${variant} is not available to click`);
        }
    }

    async clickRandomVariantButtons(){
        for (const variantBlock of await this.btnVariantBlocks.all()){
            let isSelected = false;
            const variantButtons = variantBlock.locator("li");
            const variantCount = await variantButtons.count();
            while (!isSelected){
                let randomIndex = Math.floor(Math.random() * variantCount);
                console.log(randomIndex);
                if (await variantButtons.nth(randomIndex).getAttribute("class") !== "un-available"){
                    await variantButtons.nth(randomIndex).click();
                    await this.wait(Framework.SHORT_TIMEOUT);
                    isSelected = true;
                    break;
                }
            }
        }
    }

    async getVariantErrorMessage(){
        return await this.txtVariantError.textContent();
    }

    async getDescription(){
        return await this.txtDescription.textContent();
    }
}