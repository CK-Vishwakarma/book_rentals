import { Body, Controller, Get, Post, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/CreateUser.dto';
import { User } from '@prisma/client';
import { SignInDto } from './dto/SignIn.dto';
import { Roles } from './decorators/roles.decorator';
import { JwtAuthGuard } from './guards/jwt.guard';
import { RolesGuard } from './guards/roles.guard';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }
    @Roles('ADMIN')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Post('signup')
    async registerUser(@Body() createUserDto: CreateUserDto): Promise<User> {
        return this.authService.registerUser(createUserDto)
    }
    @Post('signin')
    async signInUser(@Body() signInDto: SignInDto, @Res({ passthrough: true }) response) {
        return this.authService.signInUser(signInDto, response)
    }
    @Roles('ADMIN',"MEMBER")
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get('signout')
    async signOutUser(@Res() response) {
         this.authService.signOutUser(response)
       return response.send('Logged out successfully.');
    }
}
