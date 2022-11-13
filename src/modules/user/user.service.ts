import { User } from './user.entity';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findOneByEmail(email: string): Promise<User | undefined> {
    return this.userRepository.findOne({ where: { email } });
  }

  async create(
    email: string,
    password: string,
    firstName: string,
    lastName: string,
  ): Promise<User> {
    const user = new User();
    user.email = email;
    user.password = await bcrypt.hash(password, 10);
    user.firstName = firstName;
    user.lastName = lastName;
    return this.userRepository.save(user);
  }
}
