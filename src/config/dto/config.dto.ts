import { IsInt, IsOptional, IsString, IsBoolean } from "class-validator";

export class PgDbConfigDto {
	@IsString()
		type: string;

	@IsString()
		host: string;

	@IsInt()
		port: number;

	@IsString()
		username: string;

	@IsString()
		password: string;

	@IsString()
		database: string;
	
	@IsString()
		schema: string;

	@IsString({ each: true })
		entities: string[];

	@IsBoolean()
		synchronize: boolean;

	@IsBoolean()
		logging: boolean;
}

export class RedisConfigDto {
	@IsString()
		host: string;

	@IsInt()
		port: number;

	@IsString()
		password: string;

	@IsString()
		CREDIT_PURCHASE_PLAN_KEY: string
}

export class JwtConfigDto {
	@IsString()
		JWT_SECRET: string;

	@IsString()
		EXPIRATION_TIME: string;
}

export class ConfigDto {
	@IsString()
	@IsOptional()
		nodeEnv?: string;

	@IsString()
	@IsOptional()
		serviceName?: string;

	@IsInt()
		port: number;

		pgDb: PgDbConfigDto;

		redis: RedisConfigDto;

		jwt: JwtConfigDto;
}

