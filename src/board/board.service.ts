import { Injectable, NotFoundException } from '@nestjs/common';
import { BoardStatus } from './board-status.enum';
import {v1 as uuid} from 'uuid'
import { CreateBoardDTO } from './dto/create-board.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { BoardRepository } from './board.repository';
import { Board } from './board.entity';
import { DeleteResult } from 'typeorm';

// 다른 컴포넌트에서 이 서비스를 이용할 수 있게 해줌
@Injectable() 
export class BoardService {
    constructor(
        @InjectRepository(BoardRepository)
        private boardRepository : BoardRepository
    ){}

    async getAllBoards():Promise<Board[]>{
        return await this.boardRepository.find();
        
    }

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

    async deleteBoardById(id:number):Promise<void>{ //remove는 무조건 존재하는 경우에 사용, 
        const result = await this.boardRepository.delete(id) 

        if(result.affected === 0){//존재하지 않는 item을 지우면 에러를 던지게 해야됨
            throw new NotFoundException(`Can't found Board with id ${id}`)
        }
    }

    async updateBoardStatus(id:number, status:BoardStatus):Promise<Board>{
        const board = await this.getBoardById(id);
        board.status = status
        await this.boardRepository.save(board)
        return board;
    }

}
