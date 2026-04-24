import { ConfigService as NestConfigService } from '@nestjs/config';
export declare class MyConfigService {
    protected readonly configService: NestConfigService;
    constructor(configService: NestConfigService);
    get<T>(key: string): T;
}
