import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from '../../model/entity/User';

// to be used with the @ContextUser annotation when needed
export const ContextUser = createParamDecorator(
    (data: string, ctx: ExecutionContext) => {
        const request = ctx.switchToHttp().getRequest();
        return request.user as User;
    },
);