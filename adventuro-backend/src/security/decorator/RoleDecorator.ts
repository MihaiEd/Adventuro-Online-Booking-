import { SetMetadata } from '@nestjs/common';

// @Roles(Role.ADMIN) - role guard for endpoints
export const Roles = (...roles: string[]) => SetMetadata('roles', roles);
