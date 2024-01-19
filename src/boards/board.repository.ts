import { Repository } from "typeorm";
import { Board } from "./board.entity";
import { CustomRepository } from "src/typeorm/typeorm-ex.decorator";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateBoardDto } from "./dto/create-board.dto";
import { BoardStatus } from "./board.model";
import { NotFoundException } from "@nestjs/common";
import { User } from "src/user/user.entity";

@CustomRepository(Board)
export class BoardRepository extends Repository<Board>{

    async createBoard(createBoardDto: CreateBoardDto, user: User): Promise<Board> {
        const { title, description } = createBoardDto

        const board = this.create({
            title,
            description,
            status: BoardStatus.PUBLIC,
            user
        })

        await this.save(board)
        return board;
    }

    async deleteBoard(id: number, user: User): Promise<void> {
        const result = await this.delete({ id, user });

        if (result.affected === 0) {
            throw new NotFoundException('해당 게시물이 존재 하지 않습니다. [ID] ' + id)
        }
    }

}