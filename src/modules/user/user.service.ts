import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async find(userId: number): Promise<User> {
    return this.userRepository.findOne({ where: { id: userId } });
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findOneByEmail(email: string): Promise<User | undefined> {
    return this.userRepository.findOne({ where: { email } });
  }

  async findOneByDni(dni: string): Promise<User | undefined> {
    return this.userRepository.findOne({ where: { dni } });
  }

  async create(
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    dni: string,
    birthDate: Date,
    parishId: number,
  ): Promise<User> {
    const user = new User();
    user.email = email;
    user.password = await bcrypt.hash(password, 10);
    user.firstName = firstName;
    user.lastName = lastName;
    user.dni = dni;
    user.birthDate = birthDate;
    user.parish = <any>{ id: parishId };
    return this.userRepository.save(user);
  }

  async update(id: number, data: any): Promise<any> {
    // user.parish = <any>{ id: parishId };
    data.parish = <any>{ id: data.parishId };
    return this.userRepository.update({ id: id }, data);
  }

  async save(user: User): Promise<User> {
    return this.userRepository.save(user);
  }
}
