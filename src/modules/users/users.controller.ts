import { Controller, Get, Post, Param, Body, Put, Delete } from '@nestjs/common';
import { User } from 'src/database/entities/user.entity';
import { UserService } from './users.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() user: Omit<User, 'id'>): Promise<User> {
    return await this.userService.create(user);
  }

  @Get()
  async findAll(): Promise<User[]> {
    return await this.userService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<User> {
    return await this.userService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() updatedUser: Omit<User, 'id'>): Promise<User> {
    return await this.userService.update(id, updatedUser);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<boolean | void> {
    return await this.userService.remove(id);
  }
}
