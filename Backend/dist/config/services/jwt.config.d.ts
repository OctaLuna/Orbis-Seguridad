import { MyConfigService } from "../config.service";
export declare class MyJwtConfig {
    private readonly config;
    constructor(config: MyConfigService);
    get(): {
        isActive: boolean;
        secret: string;
        expiresIn: string;
    };
}
