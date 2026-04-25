import { Module } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { AuthController } from './api/auth.controller';
import { UsuariosModule } from 'src/modules/usuarios/usuarios.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { MyJwtConfig } from 'src/config/services/jwt.config';
import { JwtStrategy } from './services/jwt.strategy';
import { EmailModule } from 'src/shared/services/email/email.module';

@Module({
	imports: [
		UsuariosModule,
		EmailModule,
		PassportModule.register({ defaultStrategy: 'jwt' }),
		JwtModule.registerAsync({
			inject: [MyJwtConfig],
			useFactory: (jwtConfig: MyJwtConfig) => {
				const { secret, expiresIn, isActive } = jwtConfig.get();
				if (!isActive) {
					console.warn('JWT inactivo');
				}
				return {
					secret,
					signOptions: { expiresIn },
				};
			},
		}),
	],
	controllers: [AuthController],
	providers: [
		AuthService,
		JwtStrategy

	],
})
export class AuthModule { }
