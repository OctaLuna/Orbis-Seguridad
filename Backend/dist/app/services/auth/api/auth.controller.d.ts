import { AuthService } from '../services/auth.service';
import { RegisterDto } from '../dto/register.dto';
import { Response } from 'express';
import { LoginDto } from '../dto/login.dto';
import { ForgotPasswordDto, ResetPasswordDto } from '../dto/reset-password.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    register(data: RegisterDto, res: Response): Promise<Response<any, Record<string, any>>>;
    login(data: LoginDto, res: Response): Promise<Response<any, Record<string, any>>>;
    forgotPassword(dto: ForgotPasswordDto, res: Response): Promise<Response<any, Record<string, any>>>;
    validateResetToken(token: string, res: Response): Promise<Response<any, Record<string, any>>>;
    resetPassword(dto: ResetPasswordDto, res: Response): Promise<Response<any, Record<string, any>>>;
}
