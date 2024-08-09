import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, NotFoundException, UsePipes, ValidationPipe, Patch, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from '../auth/dto/CreateUser.dto';
import { UpdateUserDto } from '../auth/dto/UpdateUser.dto';
import { User } from '@prisma/client';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';


@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) { }
    
    @Roles('ADMIN')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get()
    async getUsers(): Promise<User[]> {
        return this.userService.getUsers();
    }
    
    @Roles('ADMIN')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get(':id')
    async getUserById(@Param('id', ParseIntPipe) id: number): Promise<User> {
        const user = await this.userService.getUserById(id);
        if (!user) {
            throw new NotFoundException(`User with ID ${id} not found`);
        }
        delete user.password
        return user;
    }
    @Roles('ADMIN')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Delete(':id')
    async deleteUserById(@Param('id', ParseIntPipe) id: number): Promise<User> {
        const user = await this.userService.deleteUserById(id);
        if (!user) {
            throw new NotFoundException(`User with ID ${id} not found`);
        }
        return user;
    }
    @Roles('ADMIN')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Patch(':id')
    async updateUserById(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateUserDto: UpdateUserDto
    ): Promise<User> {
        const user = await this.userService.updateUserById(id, updateUserDto);
        if (!user) {
            throw new NotFoundException(`User with ID ${id} not found`);
        }
        return user;
    }
}
