import { Injectable, NotFoundException } from '@nestjs/common';
import { BoardRepository } from './board.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Board } from './board.entity';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardStatus } from './board.model';
import { Repository } from 'typeorm';

@Injectable()
export class BoardsService {
    constructor(
        private readonly boardRepository: BoardRepository,
    ) { }

    async getAllBoards(): Promise<Board[]> {
        return this.boardRepository.find();
    }

    createBoard(createBoardDto: CreateBoardDto): Promise<Board> {
        return this.boardRepository.createBoard(createBoardDto)
    }


    async getBoardById(id: number): Promise<Board> {
        const result = await this.boardRepository.findOneBy({ id });

        if (!result) {
            throw new NotFoundException(`게시물이 존재하지 않습니다. [ID] ${id}`)
        }
        return result
    }

    deleteBoard(id: number): Promise<void> {
        return this.boardRepository.deleteBoard(id)
    }

    async updateBoardStatus(id: number, status: BoardStatus): Promise<Board> {
        const board = await this.boardRepository.findOneBy({ id });

        board.status = status;
        await this.boardRepository.save(board)

        return board;
    }
}
