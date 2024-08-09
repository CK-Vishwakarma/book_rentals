import { ConflictException, HttpException, Injectable, NotFoundException } from "@nestjs/common";
import { Prisma, User } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";
import * as bcrypt from "bcrypt";
@Injectable()
export class UserService {
  private readonly saltRounds = 10;
  constructor(private readonly prisma: PrismaService) { }

  // Get all users
  async getUsers(): Promise<User[]> {
    try {
      return await this.prisma.user.findMany()
    } catch (error) {
      throw new ConflictException('No users found');
    }
  }
  // Get a user by ID
  async getUserById(id: number): Promise<User> {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }
  // Delete a user by ID
  async deleteUserById(id: number): Promise<User> {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return this.prisma.user.delete({ where: { id } });
  }
  // Update a user by ID
  async updateUserById(id: number, data: Prisma.UserUpdateInput): Promise<User> {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    if (typeof data.password === 'string') {
      data.password = await this.hashPassword(data.password);
    }
    return this.prisma.user.update({ where: { id }, data });
  }

  // Hash password method
  private async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(this.saltRounds);
    return bcrypt.hash(password, salt);
  }
}