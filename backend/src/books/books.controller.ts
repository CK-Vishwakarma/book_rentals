import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Book } from '@prisma/client';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Roles('ADMIN')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post()
  async create(@Body() createBookDto: CreateBookDto):Promise<Book> {
    return this.booksService.createBook(createBookDto);
  }

  @Roles('ADMIN',"MEMBER")
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get()
 async findAll():Promise<Book[]> {
    return this.booksService.findAllBooks();
  }

  @Roles('ADMIN',"MEMBER")
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get(':id')
 async findOne(@Param('id') id: string):Promise<Book> {
    return this.booksService.findOneBook(+id);
  }

  @Roles('ADMIN')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateBookDto: UpdateBookDto):Promise<Book> {
    return this.booksService.updateBook(+id, updateBookDto);
  }

  @Roles('ADMIN')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete(':id')
  async deleteBook(@Param('id') id: string):Promise<string> {
    return this.booksService.deleteBook(+id);
  }
}
