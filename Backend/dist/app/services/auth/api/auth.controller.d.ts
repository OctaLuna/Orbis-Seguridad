import { AuthService } from '../services/auth.service';
import { RegisterDto } from '../dto/register.dto';
import { Response } from 'express';
import { LoginDto } from '../dto/login.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    register(data: RegisterDto, res: Response): Promise<Response<any, Record<string, any>>>;
    login(data: LoginDto, res: Response): Promise<Response<any, Record<string, any>>>;
}
