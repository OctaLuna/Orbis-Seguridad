import { Injectable } from "@nestjs/common";
import { MyConfigService } from "../config.service";

@Injectable()
export class MyServerConfig {
    constructor(private readonly config: MyConfigService){}

    get(){
        return {
            port: this.config.get<number>('PORT'),
            showEnv: this.config.get<boolean>('SHOW_ENV'),
            logs: this.config.get<boolean>('PRINT_LOGS')
        };
    }
}