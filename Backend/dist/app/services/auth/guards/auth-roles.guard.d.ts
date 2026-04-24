import { CanActivate, Type } from '@nestjs/common';
export declare const AuthRolesGuard: (roles: number[]) => Type<CanActivate>;
