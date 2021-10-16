import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardModule } from './board/board.module';
import { typeORMConfig } from './config/typeorm.config';

@Module({
  imports: [BoardModule,
    TypeOrmModule.forRoot(typeORMConfig)
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
