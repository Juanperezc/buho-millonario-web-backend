import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { RoleEnum } from './enums/role.enum';
import { Exclude } from 'class-transformer';

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

  comparePassword(attempt: string): Promise<boolean> {
    return bcrypt.compare(attempt, this.password);
  }
}
