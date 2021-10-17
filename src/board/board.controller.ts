import { Body, Controller, Delete, Get, Logger, Param, ParseIntPipe, Patch, Post, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';
import { DeleteResult } from 'typeorm';
import {  BoardStatus } from './board-status.enum';
import { Board } from './board.entity';
import { BoardService } from './board.service';
import { CreateBoardDTO } from './dto/create-board.dto';
import { BoardStatusValidationPipe } from './pipe/board-status-validation.pipe';

@Controller('board') // constructor안에서 의존성 주입이 일어나 controller에서 service 사용가능
@UseGuards(AuthGuard()) //모든 핸들러 영향을 받음, 만약 토큰이 없다면 401에러 발생
export class BoardController { //private접근제한자를 생성자 안에서 사용해 암묵적으로 class property로 이용됨
    private logger = new Logger('BoardController')
    constructor(private boardService: BoardService){}

    @Get()
    getAllMyBoards(
        @GetUser() user:User
    ):Promise<Board[]>{
        this.logger.verbose(`User ${user.username} trying to get all boards`)
        return this.boardService.getAllMyBoards(user);
    }

    @Post()
    @UsePipes(ValidationPipe)
    createBoard(
        @Body() createBoardDto:CreateBoardDTO,
        @GetUser() user:User
    ):Promise<Board>{
        return this.boardService.createBoard(createBoardDto,user);
    }

    @Get('/:id')
    getBoardById(@Param("id", ParseIntPipe) id:number):Promise<Board>{
        return this.boardService.getBoardById(id)
    }

    @Delete("/:id")
    deleteBoardById(
        @GetUser() user:User,
        @Param("id", ParseIntPipe
        ) id:number):Promise<void>{
        return this.boardService.deleteBoardById(id,user)
    }

    @Patch('/:id/status')
    updateBoardStatus(
        @Param('id') id:number, 
        @Body('status',BoardStatusValidationPipe) status:BoardStatus
        ):Promise<Board>{
        return this.boardService.updateBoardStatus(id,status)
    }
}
