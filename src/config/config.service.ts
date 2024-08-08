import { Injectable, Logger } from "@nestjs/common";
import { ConfigDto } from "./dto/config.dto";
import config from "./config";
import { validateSync } from "class-validator";
import { plainToClass } from "class-transformer";

@Injectable()
export class ConfigCustomService {
	private readonly logger = new Logger(ConfigCustomService.name);
	private readonly config: ConfigDto;

	constructor() {
		const loadedConfig = config();
		const validatedConfig = plainToClass(ConfigDto, loadedConfig);
		const errors = validateSync(validatedConfig);

		if (errors.length > 0) {
			this.logger.error(
				"Config validation error:",
				JSON.stringify(errors, null, 2),
			);
			throw new Error("Config validation failed");
		}

		this.config = validatedConfig;
		this.logger.log("Config successfully validated and loaded");
	}

	public get(key: string): any {
		return getNestedProperty(this.config, key);
	}
}

// Utility function to get nested properties
function getNestedProperty(obj: any, key: string) {
	return key.split(".").reduce((o, i) => (o ? o[i] : undefined), obj);
}

const configCustomService = new ConfigCustomService();
export default configCustomService;
