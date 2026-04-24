import { Injectable } from "@nestjs/common";
import { MyConfigService } from "../config.service";

@Injectable()
export class MyDataBaseConfig {
    constructor(private readonly config: MyConfigService) { }
    get() {
        return {
            type: this.config.get<string>('DB_TYPE'),
            host: this.config.get<string>('DB_HOST'),
            port: this.config.get<number>('DB_PORT'),
            username: this.config.get<string>('DB_USER'),
            password: this.config.get<string>('DB_PASSWORD'),
            database: this.config.get<string>('DB_NAME'),
            logging: this.config.get<boolean>('DB_LOGS'),
        };
    }
}