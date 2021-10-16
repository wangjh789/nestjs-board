import { Body, Controller, Delete, Get, Param, Patch, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import {  BoardStatus } from './board-status.enum';
import { Board } from './board.entity';
import { BoardService } from './board.service';
import { CreateBoardDTO } from './dto/create-board.dto';
import { BoardStatusValidationPipe } from './pipe/board-status-validation.pipe';

@Controller('board') // constructor안에서 의존성 주입이 일어나 controller에서 service 사용가능
export class BoardController { //private접근제한자를 생성자 안에서 사용해 암묵적으로 class property로 이용됨
    constructor(private boardService: BoardService){}

    // @Get()
    // getAllBoards():Board[]{
    //     return this.boardService.getAllBoards();
    // }

    @Post()
    @UsePipes(ValidationPipe)
    createBoard(@Body() createBoardDto:CreateBoardDTO):Promise<Board>{
        return this.boardService.createBoard(createBoardDto);
    }

    @Get('/:id')
    getBoardById(@Param("id") id:number):Promise<Board>{
        return this.boardService.getBoardById(id)
    }

    // @Delete("/:id")
    // deleteBoardById(@Param("id") boardId:string):void{
    //     return this.boardService.deleteBoardById(boardId)
    // }

    // @Patch('/:id/status')
    // updateBoardStatus(
    //     @Param('id') boardId:string, 
    //     @Body('status',BoardStatusValidationPipe) status:BoardStatus
    //     ):Board{
    //     return this.boardService.updateBoardStatus(boardId,status)
    // }
}
