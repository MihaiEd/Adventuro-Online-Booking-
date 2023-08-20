import { Role } from '../../entity/Role';
import { TokenDto } from './TokenDto';
import { User } from '../../entity/User';

export class GetUserDto {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: Role;
  authToken?: TokenDto;

  constructor(user: User, authToken?: TokenDto) {
    this.id = user.id;
    this.email = user.email;
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.role = user.role;
    this.authToken = authToken;
  }
}
