import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardModule } from './board/board.module';
import { typeORMConfig } from './config/typeorm.config';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [BoardModule,
    TypeOrmModule.forRoot(typeORMConfig),
    AuthModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
