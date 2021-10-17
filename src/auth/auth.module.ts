import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
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
  providers: [AuthService, JwtStrategy], // auth 모듈에서 사용하기 위해 등록
  exports:[JwtStrategy,PassportModule] //다른 모듈에서 사용할 수 있게끔 등록
})
export class AuthModule {}
