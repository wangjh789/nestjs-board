import { Injectable, NotFoundException } from '@nestjs/common';
import { BoardStatus } from './board-status.enum';
import {v1 as uuid} from 'uuid'
import { CreateBoardDTO } from './dto/create-board.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { BoardRepository } from './board.repository';
import { Board } from './board.entity';

// 다른 컴포넌트에서 이 서비스를 이용할 수 있게 해줌
@Injectable() 
export class BoardService {
    constructor(
        @InjectRepository(BoardRepository)
        private boardRepository : BoardRepository
    ){}
    // getAllBoards():Board[]{
    //     return this.boards;
    // }

    createBoard(createBoardDto:CreateBoardDTO):Promise<Board>{
        return this.boardRepository.createBoard(createBoardDto)
    }

    async getBoardById(id:number):Promise<Board>{
        const found =  await this.boardRepository.findOne(id)
        if(!found){
            throw new NotFoundException(`Can't find Board with id:${id}`);
        }
        return found;
    }

    // deleteBoardById(id:string):void{
    //     const found = this.getBoardById(id)
    //     this.boards = this.boards.filter((board)=> board.id!==found.id)
    // }

    // updateBoardStatus(id:string, status:BoardStatus):Board{
    //     const board = this.getBoardById(id)
    //     board.status = status;
    //     return board;
    // }

}
