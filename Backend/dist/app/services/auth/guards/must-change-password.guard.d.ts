import { ExecutionContext } from '@nestjs/common';
declare const MustChangePasswordGuard_base: import("@nestjs/passport").Type<import("@nestjs/passport").IAuthGuard>;
export declare class MustChangePasswordGuard extends MustChangePasswordGuard_base {
    canActivate(context: ExecutionContext): Promise<boolean>;
}
export {};
