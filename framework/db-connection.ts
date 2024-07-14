import {Client} from 'pg';
import {Framework} from "./framework";

export class DbConnection{
    private DBConfig = {
        user: Framework.DB_USERNAME,
        password: "",
        host: Framework.DB_HOST,
        port: Framework.DB_PORT,
        database: Framework.DB_NAME,
        idleTimeoutMillis: 30000,
        connectTimeoutMillis: 3000,
    }

    async executeQuery(query: string){
        const client = new Client(this.DBConfig);
        try{
            await client.connect();
            return await client.query(query);
        } catch (error){
            throw error;
        } finally {
            await client.end().catch((error) => {
                throw error;
            }) ;
        }
    }
}