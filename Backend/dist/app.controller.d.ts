import { Response } from "express";
export declare class AppController {
    ping(res: Response): Promise<Response<any, Record<string, any>>>;
}
