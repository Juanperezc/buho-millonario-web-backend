import * as bcrypt from 'bcrypt';
import { Exclude } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Parish } from '@modules/parish/parish.entity';
import { Ticket } from '@modules/ticket/ticket.entity';
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
  @Column({ name: 'phone', nullable: true })
  phone: string;

  //dni
  @Column({ name: 'dni', nullable: true })
  dni: string;

  //birthday
  @Column({ name: 'birth_date', nullable: true })
  birthDate: Date;

  //budget
  @Column({ name: 'budget', default: 0 })
  budget: number;

  //address
  @Column({ name: 'address', nullable: true })
  address: string;

  //remember_token
  @Column({ name: 'remember_token', nullable: true })
  rememberToken: string;

  @ManyToOne(() => Parish, (parish) => parish.users)
  @JoinColumn({ name: 'parishId' })
  parish: Parish;

  @OneToMany(() => Ticket, (ticket) => ticket.user)
  tickets: Ticket[];
  @CreateDateColumn({ name: 'created_at', type: 'timestamp with time zone' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp with time zone' })
  updatedAt: Date;

  comparePassword(attempt: string): Promise<boolean> {
    return bcrypt.compare(attempt, this.password);
  }
}
