import * as bcrypt from 'bcrypt';
import { Exclude } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { BankAccount } from '@modules/back-account/bank-account.entity';
import { Parish } from '@modules/parish/parish.entity';
import { Recharge } from '@modules/recharge/recharge.entity';
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
  @Exclude({ toPlainOnly: true })
  rememberToken: string;

  @ManyToOne(() => Parish, (parish) => parish.users, {
    eager: true,
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  parish: Parish;

  @OneToMany(() => Ticket, (ticket) => ticket.user)
  tickets: Ticket[];

  @OneToMany(() => Recharge, (recharge) => recharge.user)
  recharges: Recharge[];

  @OneToMany(() => BankAccount, (bank_account) => bank_account.user)
  bank_accounts: BankAccount[];

  @Column({ name: 'closed_reason', nullable: true, default: null })
  closedReason: string;

  @DeleteDateColumn({ name: 'deleted_at', nullable: true })
  deletedAt: Date;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp with time zone' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp with time zone' })
  updatedAt: Date;

  comparePassword(attempt: string): Promise<boolean> {
    return bcrypt.compare(attempt, this.password);
  }
}
