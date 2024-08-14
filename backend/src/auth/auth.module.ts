import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from 'src/user/user.module';
import { jwtConstants } from './constant';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
    imports: [PassportModule,
        PrismaModule,
        UserModule,
        JwtModule.register({
          global: true,
          secret: jwtConstants.secret,
          signOptions: { expiresIn: '30m' },
        }),
      ],
      providers: [AuthService,JwtStrategy],
      controllers: [AuthController],
      exports: [AuthService],
})
export class AuthModule {

}
