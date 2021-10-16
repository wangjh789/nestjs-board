import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserRepository } from './user.repository';

@Module({
  imports:[
    PassportModule.register({defaultStrategy:'jwt'}),
    JwtModule.register({
      secret:"JWT_SECERT",
      signOptions:{
        expiresIn:60*60,
      }

    }),
    TypeOrmModule.forFeature([UserRepository]), // auth 모듈에서 사용하기 위해
],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
