import {test, expect} from "@playwright/test"
import {readExcelFile} from "../utils/excel-reader";
import {PageManager} from "../pages/page-manager";
import {convertCurrencyToNumber} from "../utils/currency-utils";
import {Framework} from "../framework/framework";

test.describe('Category Page', async () => {
    let pm: PageManager;

    test.beforeEach(async ({page}) => {
        pm = new PageManager(page);
        await pm.homePage().openHomepage();
    });

    const categoryData = await readExcelFile(Framework.testDataFile, "Category");
    if (categoryData) {
        for (const row of categoryData) {
            // @ts-ignore
            for (const key in row) {
                test.beforeEach(async ({page}) => {
                    pm = new PageManager(page);
                    await pm.homePage().openHomepage();
                });

                // @ts-ignore
                test(`Verify opening category ${row[key]} from Homepage`, async () => {
                    // @ts-ignore
                    await pm.homePage().clickCategoryButton(row[key]);
                    // @ts-ignore
                    expect(row[key].toLowerCase()).toContain((await pm.categoryPage().getPagePath())?.toLowerCase());
                });

                // @ts-ignore
                test(`Verify product count displayed on ${row[key]} page matches product list size`, async () => {
                    // @ts-ignore
                    await pm.homePage().clickCategoryButton(row[key]);
                    if ((await pm.categoryPage().getProductCount()) == 0){
                        expect(await pm.categoryPage().getNoProductText()).toEqual("There is no product to display");
                    } else {
                        expect(await pm.categoryPage().getNumberOfProducts()).toEqual(await pm.categoryPage().getProductCount());
                    }
                });
            }
        }
    } else {
        console.error('Error reading Excel file!');
    }

    test('should sort products by name (ascending and descending)', async () => {
        await pm.homePage().clickCategoryButton("Shop women");
        await pm.categoryPage().selectSortByDropdown("Name");
        await pm.categoryPage().clickSortArrow(false);
        let sortedProductNames = await pm.categoryPage().getProductNames();
        for (let i = 1; i < sortedProductNames.length; i++) {
            const currentName = sortedProductNames[i];
            const previousName = sortedProductNames[i - 1];
            expect(currentName >= previousName).toBeTruthy();
        }

        await pm.categoryPage().clickSortArrow(true);
        sortedProductNames = await pm.categoryPage().getProductNames();
        for (let i = 1; i < sortedProductNames.length; i++) {
            const currentName = sortedProductNames[i];
            const previousName = sortedProductNames[i - 1];
            expect(currentName <= previousName).toBeTruthy();
        }
    });

    test('should sort products by price (ascending and descending)', async () => {
        await pm.homePage().clickCategoryButton("Shop women");
        await pm.categoryPage().selectSortByDropdown("Price");
        await pm.categoryPage().clickSortArrow(false);
        let sortedProductPrices = await pm.categoryPage().getProductPrices();
        for (let i = 1; i < sortedProductPrices.length; i++) {
            const currentPrice = convertCurrencyToNumber(sortedProductPrices[i]);
            const previousPrice = convertCurrencyToNumber(sortedProductPrices[i - 1]);
            expect(currentPrice >= previousPrice).toBeTruthy();
        }

        await pm.categoryPage().clickSortArrow(true);
        sortedProductPrices = await pm.categoryPage().getProductPrices();
        for (let i = 1; i < sortedProductPrices.length; i++) {
            const currentPrice = convertCurrencyToNumber(sortedProductPrices[i]);
            const previousPrice = convertCurrencyToNumber(sortedProductPrices[i - 1]);
            expect(currentPrice <= previousPrice).toBeTruthy();
        }
    });
});