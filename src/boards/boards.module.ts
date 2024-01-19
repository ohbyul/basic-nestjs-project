import { Module } from '@nestjs/common';
import { BoardsController } from './boards.controller';
import { BoardsService } from './boards.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardRepository } from './board.repository';
import { Board } from './board.entity';
import { TypeOrmExModule } from 'src/typeorm/typeorm-ex.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Board]),
    TypeOrmExModule.forCustomRepository([BoardRepository]),
  ],
  exports: [TypeOrmModule, TypeOrmExModule],
  controllers: [BoardsController],
  providers: [BoardsService]
})
export class BoardsModule { }
