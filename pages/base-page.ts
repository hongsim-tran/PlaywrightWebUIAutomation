import {Page} from "@playwright/test";

export class BasePage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async wait(timeInSeconds: number) {
        await this.page.waitForTimeout(timeInSeconds * 1000);
    }
}