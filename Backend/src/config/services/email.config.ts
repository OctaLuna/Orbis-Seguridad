import { Injectable } from "@nestjs/common";
import { MyConfigService } from "../config.service";

@Injectable()
export class MyEmailConfig {
    constructor(private readonly config: MyConfigService){}
    get(){
        return {
            user: this.config.get<string>('USER_EMAIL'),
            pass: this.config.get<string>('PASS_AUTH'),
        };
    }
}