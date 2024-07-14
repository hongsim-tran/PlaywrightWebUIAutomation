import {test, expect} from "@playwright/test"
import {PageManager} from "../pages/page-manager";

test.describe('ProductDetails', () => {
    let pm: PageManager;

    test.beforeEach(async ({page}) => {
        pm = new PageManager(page);
        await pm.homePage().openHomepage();
    });

    test('Verify opening product details page from Homepage', async () => {
        for (let i = 0; i < 4; i++){
            const productName = await pm.homePage().getProductName(i);
            const productPrice = await pm.homePage().getProductPrice(i);
            await pm.homePage().clickProductName(i);
            expect(productName?.toLowerCase()).toContain((await pm.productDetailsPage().getPagePath())?.toLowerCase());
            expect(productName?.toLowerCase()).toContain((await pm.productDetailsPage().getProductName())?.toLowerCase());
            expect(productPrice?.toLowerCase()).toContain((await pm.productDetailsPage().getProductPrice())?.toLowerCase());
            await pm.productDetailsPage().clickLogoLink();
        }
    });

    test('Verify opening product details page from Category page', async () => {
        await pm.homePage().clickCategoryButton("Shop men");
        const numberOfProduct = await pm.categoryPage().getNumberOfProducts();

        for (let i = 0; i < numberOfProduct; i++) {
            const productName = await pm.categoryPage().getProductName(i);
            const productPrice = await pm.categoryPage().getProductPrice(i);
            await pm.categoryPage().clickProductName(i);
            expect(productName?.toLowerCase()).toContain((await pm.productDetailsPage().getPagePath())?.toLowerCase());
            expect(productName?.toLowerCase()).toContain((await pm.productDetailsPage().getProductName())?.toLowerCase());
            expect(productPrice?.toLowerCase()).toContain((await pm.productDetailsPage().getProductPrice())?.toLowerCase());
            await pm.productDetailsPage().clickLogoLink();
            await pm.homePage().clickCategoryButton("Shop men");
        }
    });
});