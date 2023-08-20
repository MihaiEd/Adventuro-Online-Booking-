import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { User } from '../../model/entity/User';

@Injectable()
export class RoleGuard implements CanActivate {
    constructor(
        private reflector: Reflector,
    ) {
    }

    canActivate(context: ExecutionContext): boolean {
        const roles = this.reflector.get<string[]>('roles', context.getHandler());

        if (!roles) {
            return true;
        }

        const request = context.switchToHttp().getRequest();
        const user = request.user as User;
        const hasRole = () => roles.includes(user.role.name);

        return user && user.role && hasRole();
    }
}
