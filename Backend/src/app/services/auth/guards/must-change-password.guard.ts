import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class MustChangePasswordGuard extends AuthGuard('jwt') {
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const jwtValid = (await super.canActivate(context)) as boolean;
        if (!jwtValid) return false;
        const { user } = context.switchToHttp().getRequest();
        if (user.must_change_password) {
            throw new ForbiddenException({
                message: 'Debes cambiar tu contraseña antes de continuar.',
                code: 'MUST_CHANGE_PASSWORD',
            });
        }
        return true;
    }
}
