"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRolesGuard = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const passport_1 = require("@nestjs/passport");
const AuthRolesGuard = (roles) => {
    let MixinAuthRolesGuard = class MixinAuthRolesGuard extends (0, passport_1.AuthGuard)('jwt') {
        reflector;
        constructor(reflector) {
            super();
            this.reflector = reflector;
        }
        async canActivate(context) {
            const jwtValid = (await super.canActivate(context));
            if (!jwtValid)
                return false;
            const { user } = context.switchToHttp().getRequest();
            if (!roles || roles.length === 0)
                return true;
            const isAllowed = roles.some((rol) => user.rol <= rol);
            if (!isAllowed) {
                throw new common_1.ForbiddenException({
                    message: 'No tiene permiso'
                });
            }
            return true;
        }
    };
    MixinAuthRolesGuard = __decorate([
        (0, common_1.Injectable)(),
        __metadata("design:paramtypes", [core_1.Reflector])
    ], MixinAuthRolesGuard);
    return (0, common_1.mixin)(MixinAuthRolesGuard);
};
exports.AuthRolesGuard = AuthRolesGuard;
//# sourceMappingURL=auth-roles.guard.js.map