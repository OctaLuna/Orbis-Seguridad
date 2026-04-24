import { Controller, Get, Res } from "@nestjs/common";
import { Response } from "express";
import { OkRes } from "./common/utils";

@Controller('app')
export class AppController {
    @Get('ping')
    async ping(@Res() res: Response) {
        return OkRes(res, { 
            status: 'ok', 
            timestamp: new Date().toISOString() 
        })
    }
}