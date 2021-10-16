import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { DeleteResult } from 'typeorm';
import {  BoardStatus } from './board-status.enum';
import { Board } from './board.entity';
import { BoardService } from './board.service';
import { CreateBoardDTO } from './dto/create-board.dto';
import { BoardStatusValidationPipe } from './pipe/board-status-validation.pipe';

@Controller('board') // constructor안에서 의존성 주입이 일어나 controller에서 service 사용가능
export class BoardController { //private접근제한자를 생성자 안에서 사용해 암묵적으로 class property로 이용됨
    constructor(private boardService: BoardService){}

    @Get()
    getAllBoards():Promise<Board[]>{
        return this.boardService.getAllBoards();
    }

    @Post()
    @UsePipes(ValidationPipe)
    createBoard(@Body() createBoardDto:CreateBoardDTO):Promise<Board>{
        return this.boardService.createBoard(createBoardDto);
    }

    @Get('/:id')
    getBoardById(@Param("id", ParseIntPipe) id:number):Promise<Board>{
        return this.boardService.getBoardById(id)
    }

    @Delete("/:id")
    deleteBoardById(@Param("id", ParseIntPipe) id:number):Promise<void>{
        return this.boardService.deleteBoardById(id)
    }

    @Patch('/:id/status')
    updateBoardStatus(
        @Param('id') id:number, 
        @Body('status',BoardStatusValidationPipe) status:BoardStatus
        ):Promise<Board>{
        return this.boardService.updateBoardStatus(id,status)
    }
}
