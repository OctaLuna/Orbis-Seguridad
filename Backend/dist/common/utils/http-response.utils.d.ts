import { Response } from "express";
export declare const OkRes: (res: Response, object: any) => Response<any, Record<string, any>>;
export declare const CreatedRes: (res: Response, object: any) => Response<any, Record<string, any>>;
export declare const BadRequestRes: (res: Response, object: any) => Response<any, Record<string, any>>;
export declare const NotFoundRes: (res: Response, object: any) => Response<any, Record<string, any>>;
