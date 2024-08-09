import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Book, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class BooksService {
  constructor(private readonly prismaService: PrismaService) { }
  async createBook(data: Prisma.BookCreateInput): Promise<Book> {
    const { title } = data
    const checkBook = await this.prismaService.book.findUnique({ where: { title } })
    if (checkBook) throw new ConflictException(`${title} book already exist.`)
    try {
      const newBook = await this.prismaService.book.create({ data })
      return newBook
    } catch (error) {
      throw new ConflictException('Book creation failed');
    }

  }

  async findAllBooks(): Promise<Book[]> {
    const findBook = await this.prismaService.book.findMany()
    if(!findBook) throw new NotFoundException(`No books found`);
    return findBook
  }

  async findOneBook(id: number): Promise<Book> {
    const findBook = await this.prismaService.book.findUnique({ where: { id } })
    if(!findBook) throw new NotFoundException(`Book with ID ${id} not found`);
    return findBook
  }

  async updateBook(id: number, data: UpdateBookDto):Promise<Book> {
    const findBook = await this.prismaService.book.findUnique({where:{id}})
    if(!findBook) throw new NotFoundException(`Book with ID ${id} not found`);
    return this.prismaService.book.update({ where: { id }, data });
  }

  async deleteBook(id: number):Promise<string> {
    const findBook = await this.prismaService.book.findUnique({where:{id}})
    if(!findBook) throw new NotFoundException(`Book with ID ${id} not found`);
    await this.prismaService.book.delete({where:{id}});
    return `${findBook.title} by ${findBook.author} is deleted successfully.`
  }
}
