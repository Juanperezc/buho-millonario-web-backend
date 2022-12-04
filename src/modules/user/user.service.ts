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

  async findOneById(
    id: number,
    withDeleted = false,
  ): Promise<User | undefined> {
    return this.userRepository.findOne({ where: { id }, withDeleted });
  }

  async findOneByEmail(
    email: string,
    withDeleted = false,
  ): Promise<User | undefined> {
    return this.userRepository.findOne({ where: { email }, withDeleted });
  }

  async findOneByDni(dni: string): Promise<User | undefined> {
    return this.userRepository.findOne({ where: { dni } });
  }

  async generateResetPasswordToken(userId: number): Promise<string> {
    //generate random string
    const token =
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15);
    this.userRepository.update({ id: userId }, { rememberToken: token });
    return token;
  }

  async validateResetPasswordToken(token: string): Promise<number> {
    const user = await this.userRepository.findOne({
      where: { rememberToken: token },
    });
    if (user) {
      return user.id;
    }
    return 0;
  }

  async updatePassword(userId: number, password: string): Promise<any> {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    return this.userRepository.update(
      { id: userId },
      { password: hashedPassword, rememberToken: null },
    );
  }

  async closeAccount(userId: number, reasonText: string): Promise<any> {
    this.userRepository.update({ id: userId }, { closedReason: reasonText });
    return this.userRepository.softDelete({ id: userId });
  }

  async create(
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    dni: string,
    birthDate: Date,
    parishId: number,
    phone: string = null,
  ): Promise<User> {
    const user = new User();
    user.email = email;
    user.password = await bcrypt.hash(password, 10);
    user.firstName = firstName;
    user.lastName = lastName;
    user.dni = dni;
    user.birthDate = birthDate;
    user.parish = <any>{ id: parishId };
    user.phone = phone;
    return this.userRepository.save(user);
  }

  async update(id: number, data: any): Promise<any> {
    data.parish = <any>{ id: data.parishId };
    return this.userRepository.update(
      { id: id },
      {
        firstName: data.firstName,
        lastName: data.lastName,
        birthDate: data.birthDate,
        address: data.address,
        phone: data.phone,
        parish: data.parish,
      },
    );
  }

  async save(user: User): Promise<User> {
    return this.userRepository.save(user);
  }
}
