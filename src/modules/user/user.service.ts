import { User } from './user.entity';
import { USER_REPOSITORY } from '@/common/constants/providers';
import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @Inject(USER_REPOSITORY)
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
