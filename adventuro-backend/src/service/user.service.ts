import {ConflictException,HttpException, HttpStatus,Injectable, NotFoundException, UnauthorizedException} from "@nestjs/common";
import {plainToClass} from 'class-transformer';
import {CreateUserDto} from '../model/dto/user/CreateUserDto';
import {TokenDto} from '../model/dto/user/TokenDto';
import {GetUserDto} from '../model/dto/user/GetUserDto';
import {RoleEnum} from '../model/enum/RoleEnum';
import {JwtPayload } from '../security/JwtPayload';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User} from '../model/entity/User';
import {Role} from '../model/entity/Role';
import {RegisterUserDto} from '../model/dto/user/RegisterUserDto';
import * as jwt from 'jsonwebtoken';
import {ConfigService} from '@nestjs/config';
import {UpdateUserDto} from "../model/dto/user/UpdateUserDto";
import {LoginUserDto} from "../model/dto/user/LoginUserDto";
import * as bcrypt from 'bcryptjs';
import {ChangePasswordDto} from "../model/dto/user/ChangePasswordDto";


@Injectable()
export class UserService {
    private static JWT_KEY = 'JWT_SECRET';

    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        @InjectRepository(Role)
        private readonly roleRepository: Repository<Role>,
        private readonly configService: ConfigService,
    ) {
    }

    async register(dto: RegisterUserDto): Promise<GetUserDto> {
        const createUserDto = new CreateUserDto(
            dto.email,
            dto.password,
            dto.firstName,
            dto.lastName,
            RoleEnum.CLIENT,
        );

        return await this.save(createUserDto);
    }

    async create(dto: CreateUserDto): Promise<GetUserDto> {
        const createUserDto = new CreateUserDto(
            dto.email,
            dto.password,
            dto.firstName,
            dto.lastName,
            dto.role
        );

        return await this.save(createUserDto);
    }

    async save(dto: CreateUserDto): Promise<GetUserDto> {
        const userEntity: User = plainToClass(User, dto);

        userEntity.role = await this.getRole(dto.role);

        const createdUser: User = await this.userRepository.save(userEntity);
        const token = this.createToken(createdUser);

        return new GetUserDto(createdUser, token);
    }

    async getUserById(id: string, currentUser: User) {
        if (currentUser.role.name != RoleEnum.ADMIN && id != currentUser.id) {
            throw new ConflictException('Cannot access another user')
        }
            return await this.userRepository.findOne({
                where: {
                    id: id
                }
            });
    }

    async update(id:string, authenticatedUser: User, dto: UpdateUserDto):Promise<GetUserDto> {
        if(authenticatedUser.role.name != RoleEnum.ADMIN && id != authenticatedUser.id) {
            throw new ConflictException("Cannot update other users")
        }

        const user=this.userRepository.findOneBy({id:id});

        if(user === null) {
            throw new NotFoundException('User could not be found');
        }

        const updatedUserEntity: User= plainToClass(User,dto);

        return await this.userRepository.update({
            id:id
            },updatedUserEntity).then(() => {
                return this.userRepository.findOneBy({id:id});
            });
    }

    async changePassword(id: string, authenticatedUser: User, dto: ChangePasswordDto):Promise<GetUserDto> {
        if(id != authenticatedUser.id) {
            throw new ConflictException("Cannot update other users password")
        }

        const user = await this.userRepository.findOneBy({id:id});

        if (!await bcrypt.compare( dto.oldPassword, user.password)) {
            throw new UnauthorizedException("Wrong password!")
        }

        const updatedPassword = await bcrypt.hash(dto.newPassword, 10);

        return await this.userRepository.update({
            id: id
        }, {
            password: updatedPassword
        }).then(() => {
            return this.userRepository.findOneBy({id: id});
        })
    }

    private async getRole(role: RoleEnum): Promise<Role> {
        const foundRole = await this.roleRepository.findOne({
            where: {
                name: role,
            },
        });

        if (!foundRole) {
            throw new NotFoundException(`Could not find the Role: ${role}`);
        }

        return foundRole;
    }

    private createToken(payload: JwtPayload): TokenDto {
        const expiresIn = 3600 * 24; // seconds (24 hour)
        const expiryDate = new Date().getTime() + (expiresIn * 1000);

        const accessToken = jwt.sign(
            {email: payload.email},
            this.configService.get(UserService.JWT_KEY),
            {expiresIn: expiresIn},
        );

        return new TokenDto(accessToken, expiryDate);
    }

    async findUserOrNullByEmail(email: string): Promise<User> {
        return await this.userRepository.findOne({
            where: {
                email: email,
            },
        });
    }

    async deleteUser(id: string, currentUser: User) {
        if(id === currentUser.id) {
            throw new HttpException('Cannot delete current user', HttpStatus.CONFLICT)
        }
        const deleteUser = await this.userRepository.delete(id);
        if(!deleteUser.affected) {
            throw new HttpException('User not found', HttpStatus.NOT_FOUND)
        }
    }

    private async findUserByEmail(email: string): Promise<User>{

        const user = await this.userRepository.findOne({
            where: {
                email: email,
            },
        });

        if(user === null){
            throw new NotFoundException("User not found!")
        }

        return user;
    }

    async login(dto: LoginUserDto) {
        const user = await this.findUserByEmail(dto.email)

        if (!await bcrypt.compare(dto.password, user.password)) {
            throw new UnauthorizedException("Wrong password!")
        }

        return new GetUserDto(user, this.createToken(user));
    }

    async getAllUsers(): Promise<GetUserDto[]>
    {
        const response:GetUserDto[]=[];
        const users = await this.userRepository.find();

        for (const user of users){
            response.push(new GetUserDto(user, null))
        }
        return response;
    }
}
