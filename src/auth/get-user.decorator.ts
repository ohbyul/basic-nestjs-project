import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from 'src/user/user.entity';

export const UserParam = createParamDecorator((_data: unknown, ctx: ExecutionContext): User => {
    const req = ctx.switchToHttp().getRequest();
    return req.user;
});
