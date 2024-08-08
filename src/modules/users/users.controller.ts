import { Controller, Get, Post, Param, Body, Put, Delete } from '@nestjs/common';
import { User } from 'src/database/entities/user.entity';
import { UserService } from './users.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() user: Omit<User, 'id'>): User {
    return this.userService.create(user);
  }

  @Get()
  findAll(): User[] {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): User {
    return this.userService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() updatedUser: Omit<User, 'id'>): User {
    return this.userService.update(id, updatedUser);
  }

  @Delete(':id')
  remove(@Param('id') id: number): void {
    return this.userService.remove(id);
  }
}
