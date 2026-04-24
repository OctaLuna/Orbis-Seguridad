import { HttpStatus } from "@nestjs/common"
import { Response } from "express"

export const OkRes = (res: Response,object: any) => {
    return res.status(HttpStatus.OK).json(object);
}

export const CreatedRes = (res: Response,object: any) => {
    return res.status(HttpStatus.CREATED).json(object);
}

export const BadRequestRes = (res: Response,object: any) => {
    return res.status(HttpStatus.BAD_REQUEST).json(object);
}

export const NotFoundRes = (res: Response,object: any) => {
    return res.status(HttpStatus.NOT_FOUND).json(object);
}