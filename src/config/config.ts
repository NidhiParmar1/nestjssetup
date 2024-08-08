import {
	ConfigDto,
	PgDbConfigDto,
	RedisConfigDto,
	JwtConfigDto,
} from "./dto/config.dto";

export default (): ConfigDto => ({
	nodeEnv: process.env.NODE_ENV,
	serviceName: process.env.SERVICE_NAME || "node typescript postgres app",
	port: Number(process.env.PORT) || 3000,
	pgDb: {
		type: "postgres",
		host: process.env.DB_HOST,
		port: parseInt(process.env.DB_PORT, 10) || 5432,
		username: process.env.DB_USERNAME,
		password: process.env.DB_PASSWORD,
		database: process.env.DB_NAME,
		entities: [__dirname + "/../**/*.entity{.ts,.js}"],
		synchronize: true,
		schema: process.env.DB_SCHEMA || "public",
		logging: false,
	} as PgDbConfigDto,
	redis: {
		host: process.env.REDIS_HOST,
		port: parseInt(process.env.REDIS_PORT),
		password: process.env.REDIS_PASSWORD,
	} as RedisConfigDto,
	jwt: {
		JWT_SECRET: process.env.JWT_SECRET,
		EXPIRATION_TIME: process.env.JWT_EXPIRATION_TIME,
	} as JwtConfigDto,
});
