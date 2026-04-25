import { Global, Module } from '@nestjs/common';
import { PasswordValidatorService } from './services/password-validator.service';

@Global()
@Module({
    providers: [PasswordValidatorService],
    exports: [PasswordValidatorService],
})
export class CommonModule {}
