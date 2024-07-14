export class Framework {
    static readonly testDataFile: string = "./test-data/data.xlsx";

    static readonly BASE_URL: string = process.env.BASE_URL!;
    static readonly USERNAME: string = process.env.USERNAME!;
    static readonly PASSWORD: string = process.env.PASSWORD!;
    static readonly ADMIN_URL: string = process.env.ADMIN_URL!;
    static readonly ADMIN_USERNAME: string = process.env.ADMIN_USERNAME!;
    static readonly ADMIN_PASSWORD: string = process.env.ADMIN_PASSWORD!;
    static readonly DB_URL: string = process.env.DB_URL!;
    static readonly DB_HOST: string = process.env.DB_HOST!;
    static readonly DB_PORT: number = parseInt(process.env.DB_PORT!);
    static readonly DB_NAME: string = process.env.DB_NAME!;
    static readonly DB_USERNAME: string = process.env.DB_USERNAME!;
    static readonly SHORT_TIMEOUT: number = parseInt(process.env.SHORT_TIMEOUT!);
    static readonly LONG_TIMEOUT: number = parseInt(process.env.LONG_TIMEOUT!);
}