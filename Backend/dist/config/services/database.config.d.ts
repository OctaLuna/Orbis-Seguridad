import { MyConfigService } from "../config.service";
export declare class MyDataBaseConfig {
    private readonly config;
    constructor(config: MyConfigService);
    get(): {
        type: string;
        host: string;
        port: number;
        username: string;
        password: string;
        database: string;
        logging: boolean;
    };
}
