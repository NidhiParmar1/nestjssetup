import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from 'src/database/entities/user.entity';
import { Repository } from 'typeorm/repository/Repository';
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {}
  private users: User[] = [];
  private idCounter = 1;

  async create(user: Omit<User, 'id'>): Promise<User> {
    const newUser = { ...user };
    // this.userRepository.find();
    const userResponse = await this.userRepository.save(newUser);
    return userResponse;
  }

  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async findOne(id: number): Promise<User> | undefined {
    const user = await this.userRepository.findOne({where: {id}});
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async update(id: number, body): Promise<User> {
    let user = await this.userRepository.findOne({where: {id}});
    if (body.name) {
      user.name = body.name;
    }
    // Save updated user profile to the database
    if (!user) {
      throw new NotFoundException('User not found');
    }
		user = await this.userRepository.save(user);
    return user;
  }

  async remove(id: number): Promise<boolean | void> {
    let user = await this.userRepository.findOne({where: {id}});
    // Save updated user profile to the database
    if (!user) {
      throw new NotFoundException('User not found');
    }
    await this.userRepository.delete({id});
    return true;
  }
}
