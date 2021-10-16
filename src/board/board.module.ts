import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardController } from './board.controller';
import { BoardRepository } from './board.repository';
import { BoardService } from './board.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([BoardRepository]) //다른 곳에서 리파지토리를 사용할 수 있게끔 import
  ],
  controllers: [BoardController],
  providers: [BoardService]
})
export class BoardModule {}
