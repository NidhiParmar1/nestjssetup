import { DataSource, DataSourceOptions } from "typeorm";
import configCustomService from "../config/config.service";
import { Logger } from "@nestjs/common";

const getConfig = async () => {
    const config: DataSourceOptions = {
        type: "postgres",
        host: configCustomService.get("pgDb.host"),
        port: configCustomService.get("pgDb.port"),
        username: configCustomService.get("pgDb.username"),
        password: configCustomService.get("pgDb.password"),
        database: configCustomService.get("pgDb.database"),
        entities: [__dirname + "/../**/*.entity{.ts,.js}"],
        synchronize: false, // Set to false to use migrations
        migrations: [__dirname + "/../database/migrations/*{.ts,.js}"],
        logging: configCustomService.get("pgDb.logging"),
        schema: configCustomService.get("pgDb.schema"),
    };
    return config;
};

export class DatabaseInitialization {
    public static dataSource: DataSource;
    public static AppDataSource: DataSource;

    static async dataSourceInstance() {
        try {
            const dbConfig = await getConfig();
            this.AppDataSource = new DataSource(dbConfig);
            this.dataSource = await this.AppDataSource.initialize();
            await this.isSchemaExist(dbConfig, this.dataSource);
            
            // Run migrations
            await this.dataSource.runMigrations();
            
            await this.dataSource.destroy();
            return this.AppDataSource;
        } catch (error) {
            Logger.error('Error during Data Source initialization:', error);
            throw error;
        }
    }

    static async isSchemaExist(dbConfig, dbConnection) {
        const schemaExists = await this.schemaExists(dbConfig["schema"], dbConnection);
        if (!schemaExists) {
            await this.createSchema(dbConfig["schema"], dbConnection);
        }
    }

    static async schemaExists(schemaName: string, dbConnection: DataSource): Promise<boolean> {
        const query = `SELECT schema_name FROM information_schema.schemata WHERE schema_name = '${schemaName}'`;
        const result = await dbConnection.query(query);
        return result.length > 0;
    }

    static async createSchema(schemaName: string, dbConnection: DataSource): Promise<void> {
        const query = `CREATE SCHEMA ${schemaName}`;
        await dbConnection.query(query);
    }
}

export default DatabaseInitialization.dataSourceInstance();
