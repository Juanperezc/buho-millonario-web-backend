import * as bcrypt from 'bcrypt';
import { Exclude } from 'class-transformer';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { RoleEnum } from './enums/role.enum';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  //firstName
  @Column({ name: 'first_name' })
  firstName: string;

  //lastName
  @Column({ name: 'last_name' })
  lastName: string;

  //email
  @Column({ unique: true })
  email: string;

  //password
  @Column()
  @Exclude({ toPlainOnly: true })
  password?: string;

  //role
  @Column({ default: RoleEnum.USER })
  role: RoleEnum;

  //phone
  @Column({ name: 'phone' })

  //birthday
  @Column({ name: 'birthday', nullable: true })
  birthday: Date;

  //budget
  @Column({ name: 'budget', default: 0 })
  budget: number;

  //address
  @Column({ name: 'address', nullable: true })
  address: string;

  //remember_token
  @Column({ name: 'remember_token', nullable: true })
  rememberToken: string;

  comparePassword(attempt: string): Promise<boolean> {
    return bcrypt.compare(attempt, this.password);
  }
}
