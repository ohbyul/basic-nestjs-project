import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from 'src/user/user.entity';
import { UserRepository } from 'src/user/user.repository';
import { AuthCredentialsDto } from './dto/aurh-credentials.dto';
import * as bcrypt from 'bcryptjs'
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
    constructor(
        private readonly userRepository: UserRepository,
        private jwtService: JwtService,
    ) { }

    async createUser(authCredentialsDto: AuthCredentialsDto): Promise<void> {
        return await this.userRepository.createUser(authCredentialsDto);
    }

    async signIn(authCredentialsDto: AuthCredentialsDto): Promise<{ accessToken: string }> {
        const { username, password } = authCredentialsDto
        const user = await this.userRepository.findOneBy({ username })

        if (user && (await bcrypt.compare(password, user.password))) {
            // 유저 토큰 생성( secret + payload )
            const payload = { username }
            const accessToken = await this.jwtService.sign(payload)

            return { accessToken }
        } else {
            throw new UnauthorizedException('login failed')
        }
    }
}
