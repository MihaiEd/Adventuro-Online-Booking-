import {ApiBearerAuth,ApiTags} from '@nestjs/swagger';
import {Body, Controller, Delete, Get, Param, Post, Put,Res, UseGuards} from '@nestjs/common';
import {Response } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from '../security/decorator/RoleDecorator';
import { RoleEnum } from '../model/enum/RoleEnum';
import { ContextUser } from '../security/decorator/ContextUser';
import {UserService} from '../service/user.service';
import {ApiResponseFactory} from '../security/ApiResponseFactory';
import {RegisterUserDto} from '../model/dto/user/RegisterUserDto';
import {RoleGuard} from '../security/guard/RoleGuard';
import { CreateUserDto } from '../model/dto/user/CreateUserDto';
import {UpdateUserDto} from '../model/dto/user/UpdateUserDto';
import {User} from '../model/entity/User';

import { LoginUserDto } from '../model/dto/user/LoginUserDto';
import {ChangePasswordDto} from "../model/dto/user/ChangePasswordDto";

@Controller('users')
@ApiTags('Users')
export class UserController {
    constructor(
        private readonly apiResponseFactory: ApiResponseFactory,
        private readonly userService: UserService,
    ) {
    }

    @Post('/register')
    async register(
        @Body() dto: RegisterUserDto,
        @Res() response: Response,
    ): Promise<any> {
        const createdUser = await this.userService.register(dto);
        return this.apiResponseFactory.success(createdUser, 'User successfully registered', response);
    }

    @Roles(RoleEnum.ADMIN)
    @Post()
    async create(
        @Body() dto: CreateUserDto,
        @Res() response: Response,
    ): Promise<any> {
        const createdUser = await this.userService.create(dto);
        return this.apiResponseFactory.success(createdUser, 'User successfully registered with the role of: ' + createdUser.role.name, response);
    }

    @Delete('/:id')
    @Roles(RoleEnum.ADMIN)
    @UseGuards(AuthGuard('jwt'), RoleGuard)
    @ApiBearerAuth()
    async deleteUser(
        @ContextUser() user,
        @Param('id') id: string,
    ) {
        await this.userService.deleteUser(id, user);
    }

    @Get(':id')
    @UseGuards(AuthGuard('jwt'))
    @ApiBearerAuth()
    async getUserById(
        @ContextUser() user: User,
        @Param('id') id: string,
        @Res() response: Response,
    ): Promise<any> {
        const fetchedUser = await this.userService.getUserById(id, user);
        return this.apiResponseFactory.success(fetchedUser, 'User request ', response);
    }

    @Put(':id')
    @UseGuards(AuthGuard('jwt'), RoleGuard)
    @ApiBearerAuth()
    async update(
        @ContextUser() user: User,
        @Body() dto: UpdateUserDto,
        @Res() response: Response,
        @Param('id') id: string,
    ): Promise<any> {
        const updatedUser = await this.userService.update(id, user, dto);
        return this.apiResponseFactory.success(updatedUser, 'User successfully updated', response);
    }

    @Put('/changePassword/:id')
    @UseGuards(AuthGuard('jwt'), RoleGuard)
    @ApiBearerAuth()
    async changePassword(
        @ContextUser() user: User,
        @Body() dto: ChangePasswordDto,
        @Res() response: Response,
        @Param('id') id: string,
    ): Promise<any> {
        const updatedUser = await this.userService.changePassword(id, user, dto);
        return this.apiResponseFactory.success(updatedUser, 'Password successfully updated', response);
    }


    @Post('/login')
    async login(
        @Body() dto: LoginUserDto,
        @Res() response: Response,
    ): Promise<any> {
        const loginUser = await this.userService.login(dto);
        return this.apiResponseFactory.success(loginUser, 'User logged in successfully', response);
    }

    @Get('/')
    async getAll(@Res() response: Response): Promise<any> {
        const allUsers = await this.userService.getAllUsers();
        return this.apiResponseFactory.success(allUsers, 'User successfully listed!', response);

    }
}
