import { Logger, Module, OnModuleInit } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import configuration from "../config/config";
import { DataSource } from "typeorm";
import { ConfigModule, ConfigService } from "@nestjs/config";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: "postgres",
        host: configService.get<string>("pgDb.host"),
        port: configService.get<number>("pgDb.port"),
        username: configService.get<string>("pgDb.username"),
        password: configService.get<string>("pgDb.password"),
        database: configService.get<string>("pgDb.database"),
        entities: [__dirname + "/../**/*.entity{.ts,.js}"],
        synchronize: configService.get<boolean>("pgDb.synchronize"),
        migrations: [__dirname + "database/migrations/*{.ts,.js}"],
        logging: configService.get<boolean>("pgDb.logging"),
      }),
    }),
  ],
  exports: [TypeOrmModule],
})
export class DatabaseModule implements OnModuleInit {
  private readonly logger = new Logger(DatabaseModule.name);

  constructor(private dataSource: DataSource) {}

  async onModuleInit() {
    if (!this.dataSource.isInitialized) {
      try {
        await this.dataSource.initialize();
        this.logger.log('Database connection successful');
      } catch (error) {
        this.logger.error('Database connection failed', error.stack);
      }
    } else {
      this.logger.log('Database connection already initialized');
    }
  }
}