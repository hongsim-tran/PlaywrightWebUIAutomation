import {test as base} from "@playwright/test"
import {DbConnection} from "./db-connection";

type MyFixtures = {
    dataBase: DbConnection;
}

export const test = base.extend<MyFixtures>({
    dataBase: async ({}, use) => {
        const dataBase = new DbConnection();
        await use(dataBase);
    }
});

export {expect} from "@playwright/test"