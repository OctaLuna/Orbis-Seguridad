import { MyConfigService } from "../config.service";
export declare class MyServerConfig {
    private readonly config;
    constructor(config: MyConfigService);
    get(): {
        port: number;
        showEnv: boolean;
        logs: boolean;
    };
}
