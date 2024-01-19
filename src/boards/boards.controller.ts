import { Body, Controller, Delete, Get, Logger, Param, ParseIntPipe, Post, Put, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { BoardsService } from './boards.service';
import { Board } from './board.entity';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardStatusValidationPipe } from './pipes/board-status-validation.pipe';
import { BoardStatus } from './board.model';
import { AuthGuard } from '@nestjs/passport';
import { UserParam } from 'src/auth/get-user.decorator';
import { User } from 'src/user/user.entity';


@Controller('boards')
@UseGuards(AuthGuard())
export class BoardsController {
    private logger = new Logger('BoardsController')
    constructor(
        private boardsService: BoardsService
    ) { }

    @Get('/')
    getAllBoards(
        @UserParam() user: User
    ): Promise<Board[]> {
        this.logger.verbose(`User "${user.username}" trying to get all boards.`)
        return this.boardsService.getAllBoards(user);
    }

    @Post('/')
    @UsePipes(ValidationPipe)
    createBoard(
        @Body() createBoardDto: CreateBoardDto,
        @UserParam() user: User
    ): Promise<Board> {
        this.logger.verbose(`User "${user.username}" creating a new board.
        payload : [${JSON.stringify(createBoardDto)}]`)
        return this.boardsService.createBoard(createBoardDto, user);
    }

    @Get('/:id')
    getBoardById(@Param('id') id: number): Promise<Board> {
        return this.boardsService.getBoardById(id);
    }

    @Delete('/:id')
    deleteBoard(
        @Param('id', ParseIntPipe) id: number,
        @UserParam() user: User
    ): Promise<void> {
        return this.boardsService.deleteBoard(id, user);
    }

    @Put('/:id/status')
    updateBoardStatus(
        @Param('id', ParseIntPipe) id: number,
        @Body('status', BoardStatusValidationPipe) status: BoardStatus
    ): Promise<Board> {
        return this.boardsService.updateBoardStatus(id, status);
    }
}
