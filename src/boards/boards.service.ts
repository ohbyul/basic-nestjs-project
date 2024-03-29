import { Injectable, NotFoundException } from '@nestjs/common';
import { BoardRepository } from './board.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Board } from './board.entity';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardStatus } from './board.model';
import { Repository } from 'typeorm';
import { User } from 'src/user/user.entity';

@Injectable()
export class BoardsService {
    constructor(
        private readonly boardRepository: BoardRepository,
    ) { }

    async getAllBoards(user: User): Promise<Board[]> {
        const query = this.boardRepository.createQueryBuilder('board');
        query.where('board.userId = :userId', { userId: user.id })

        const boards = await query.getMany()
        return boards;
        // return this.boardRepository.find();
    }

    createBoard(createBoardDto: CreateBoardDto, user: User): Promise<Board> {
        return this.boardRepository.createBoard(createBoardDto, user)
    }


    async getBoardById(id: number): Promise<Board> {
        const result = await this.boardRepository.findOneBy({ id });

        if (!result) {
            throw new NotFoundException(`게시물이 존재하지 않습니다. [ID] ${id}`)
        }
        return result
    }

    deleteBoard(id: number, user: User): Promise<void> {
        return this.boardRepository.deleteBoard(id, user)
    }

    async updateBoardStatus(id: number, status: BoardStatus): Promise<Board> {
        const board = await this.boardRepository.findOneBy({ id });

        board.status = status;
        await this.boardRepository.save(board)

        return board;
    }
}
