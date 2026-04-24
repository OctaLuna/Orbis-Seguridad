import { Injectable } from "@nestjs/common";
import { MyConfigService } from "../config.service";

@Injectable()
export class MyJwtConfig {
    constructor(private readonly config: MyConfigService){}
    get(){
        return {
            isActive: this.config.get<boolean>('ACTIVE_JWT'),
            secret: this.config.get<string>('JWT_SECRET'),
            expiresIn: this.config.get<string>('JWT_TIME_EXPIRE'),
        };
    }
}