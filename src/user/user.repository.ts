import { Repository } from "typeorm";
import { CustomRepository } from "src/typeorm/typeorm-ex.decorator";
import { ConflictException, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { User } from "./user.entity";
import { AuthCredentialsDto } from "src/auth/dto/aurh-credentials.dto";
import * as bcrypt from 'bcryptjs'

@CustomRepository(User)
export class UserRepository extends Repository<User>{

    async createUser(authCredentialsDto: AuthCredentialsDto): Promise<void> {
        const { username, password } = authCredentialsDto

        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt)

        // const user = this.create({ username, password });
        const user = this.create({ username, password: hashedPassword });


        try {
            await this.save(user)
        } catch (error) {
            if (error.code === '23505') {
                throw new ConflictException('이미 존재하는 username 입니다.')
            } else {
                throw new InternalServerErrorException()
            }
        }
    }


}