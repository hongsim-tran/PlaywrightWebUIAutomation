import {Navigation} from "./navigation";
import {Locator, Page} from "@playwright/test";

export class ShoppingCartPage extends Navigation{
    private readonly pnlCartItems: Locator;
    private readonly lnkProductNames: Locator;
    private readonly txtVariants: Locator;
    private readonly lnkRemoves: Locator;
    private readonly txtProductPrices: Locator;
    private readonly txbCoupon: Locator;
    private readonly btnApply: Locator;
    private readonly txtSubTotalPrice: Locator;
    private readonly txtTotalPrice: Locator;
    private readonly btnCheckout: Locator;
    private readonly txtEmptyCart: Locator;

    constructor(page: Page) {
        super(page);
        this.pnlCartItems = page.locator(".cart-tem-info");
        this.lnkProductNames = page.locator("a[class*='name']");
        this.txtVariants = page.locator(".attribute-name");
        this.lnkRemoves = page.locator("cart-tem-info").getByText("Remove");
        this.txtProductPrices = page.locator(".sale-price");
        this.txbCoupon = page.getByPlaceholder("Enter coupon code");
        this.btnApply = page.getByRole("button", {name: "Apply"});
        this.txtSubTotalPrice = page.locator(".summary").filter({hasText: "Sub total"}).locator(".text-right");
        this.txtTotalPrice = page.locator(".grand-total-value");
        this.btnCheckout = page.getByRole("button", {name: "CHECKOUT"});
        this.txtEmptyCart = page.getByText("Your cart is empty!");
    }

    async getNumberOfProducts(){
        if (await this.pnlCartItems.isVisible())
            return this.pnlCartItems.count();
        else return 0;
    }

    async clickProductName(productInput: number | string){
        if (typeof productInput === "string"){
            await this.lnkProductNames.getByText(productInput).click();
        } else await this.lnkProductNames.nth(productInput).click();
    }

    async getProductName(index: number){
        return await this.lnkProductNames.nth(index).textContent();
    }

    async getProductNames(){
        return await this.lnkProductNames.allTextContents();
    }

    async getNumberOfVariants(index: number){
        return await this.pnlCartItems.nth(index).locator(".attribute-name").count();
    }

    async getVariants(index: number){
        return await this.pnlCartItems.nth(index).locator("li").filter({has: this.txtVariants}).locator("span:nth-last-of-type(1)").allTextContents();
    }

    async clickRemoveLink(index: number){
        await this.lnkRemoves.nth(index).click();
    }

    async getProductPrice(index: number){
        return await this.txtProductPrices.nth(index).textContent();
    }

    async getProductPrices(){
        return await this.txtProductPrices.allTextContents();
    }

    async inputCoupon(couponCode: string){
        await this.txbCoupon.fill(couponCode);
    }

    async clickApplyButton(){
        await this.btnApply.click();
    }

    async getSubTotalPrice(){
        return await this.txtSubTotalPrice.textContent();
    }

    async getTotalPrice(){
        return await this.txtTotalPrice.textContent();
    }

    async clickCheckoutButton(){
        await this.btnCheckout.click();
    }

    async getEmptyCartText(){
        return await this.txtEmptyCart.textContent();
    }
}