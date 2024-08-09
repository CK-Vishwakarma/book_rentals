import { ConflictException, ForbiddenException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from "bcrypt"
import { SignInDto } from './dto/SignIn.dto';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';

@Injectable()
export class AuthService {
    private readonly saltRounds = 10;
    constructor(private readonly prisma: PrismaService,private readonly jwtService: JwtService) { }
    // Register user
    async registerUser(data: Prisma.UserCreateInput): Promise<User> {
        const { email } = data
        const checkUser = await this.prisma.user.findUnique({ where: { email } })
        if (checkUser) {
            throw new ConflictException('User already exist');
        }
        if (data.password) {
            data.password = await this.hashPassword(data.password)
        }        
        try {
            const user = await this.prisma.user.create({ data })
            return user

        } catch (error) {
            throw new ConflictException('User creation failed');
        }
    }
    // SignIn user
    async signInUser(data: SignInDto,response?:Response): Promise<string> {
        const { email, password } = data
        const checkUser = await this.prisma.user.findUnique({ where: { email } })
        if (!checkUser) {
            throw new NotFoundException('User do not exist');
        }
        const authenticateUser = await this.comparePassword(password, checkUser.password)
        
        if (!authenticateUser) {
            throw new UnauthorizedException('Invalid credentials');
        }
        const payload = { id: checkUser.id, email: checkUser.email, role: checkUser.role };
        const access_token = await this.jwtService.signAsync(payload) 
        if(!access_token) {
            throw new ForbiddenException()
        }
        response.cookie("access_token",access_token)
        return "Logged in successfully."
    }
    // Signout user
    async signOutUser(response:Response):Promise<string>{
         await response.clearCookie("access_token");   
        return "Logged out successfully."
    }

    // Hash password method
    private async hashPassword(password: string): Promise<string> {
        const salt = await bcrypt.genSalt(this.saltRounds);
        return bcrypt.hash(password, salt);
    }
    // Compare password method
    private async comparePassword(password: string, hashedPassword: string): Promise<boolean> {
        const salt = await bcrypt.compare(password, hashedPassword);
        return salt;
    }
}
