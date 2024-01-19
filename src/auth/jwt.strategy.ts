import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import { ExtractJwt, Strategy } from "passport-jwt";
import { User } from "src/user/user.entity";
import { UserRepository } from "src/user/user.repository";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository
    ) {
        super({
            secretOrKey: 'byul91oh',        //토큰 생성시 사용했던것과 같은 키
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
        })
    }

    // 토큰이 유효하면 실행하는 vlaidate
    async validate(payload) {
        const { username } = payload;
        const user: User = await this.userRepository.findOneBy({ username });

        if (!user) {
            throw new UnauthorizedException()
        }
        return user;
    }
}