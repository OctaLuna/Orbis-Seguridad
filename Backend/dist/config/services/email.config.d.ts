import { MyConfigService } from "../config.service";
export declare class MyEmailConfig {
    private readonly config;
    constructor(config: MyConfigService);
    get(): {
        user: string;
        pass: string;
    };
}
