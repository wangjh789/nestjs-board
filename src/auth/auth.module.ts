import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserRepository } from './user.repository';

@Module({
  imports:[
    TypeOrmModule.forFeature([UserRepository]), // auth 모듈에서 사용하기 위해
],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
